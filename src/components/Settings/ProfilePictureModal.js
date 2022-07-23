import React, { useRef, useState } from 'react';
import { storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useAuth } from '../Auth/AuthContext';
import {
  Badge,
  Button,
  FileInput,
  Label,
  Modal,
  Progress,
} from 'flowbite-react';
import addProfilePicture from './addProfilePicture';
import imageCompression from 'browser-image-compression';
import { v4 as uuidv4 } from 'uuid';

function ProfilePictureModal({ onClick, upload }) {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progressBar, setProgressBar] = useState(0);
  const inputRef = useRef();
  const { currentUser, setCurrentUser } = useAuth();

  const handleUpload = async () => {
    if (image == null) {
      return;
    }
    setLoading(true);
    const imageRef = ref(storage, `instaPics/${currentUser.uid}/${uuidv4()}`);
    const options = {
      maxWidthOrHeight: 360,
      useWebWorker: true,
    };
    const compressedFile = await imageCompression(image, options);
    const uploadTask = uploadBytesResumable(imageRef, compressedFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgressBar(Math.round(progress));
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then(async (url) => {
            await addProfilePicture(currentUser, url);
            await setCurrentUser({
              ...currentUser,
              profilePicture: url,
            });
          })
          .then(
            setTimeout(() => {
              onClick();
              setProgressBar(0);
              setLoading(false);
              setImage('');
              inputRef.current.value = '';
            }, 1500)
          );
      }
    );
  };

  return (
    <>
      <Modal show={upload} size="md" popup={true} onClose={onClick}>
        <Modal.Header>Upload a profile picture</Modal.Header>
        <Modal.Body>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="file" value="Upload file" />
            </div>
            <FileInput
              accept="image/png, image/jpeg"
              ref={inputRef}
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              id="file"
            />
          </div>
          {progressBar > 0 && (
            <div className="my-4">
              <Progress
                labelProgress={true}
                label="Upload"
                labelPosition="outside"
                progress={progressBar}
              />
            </div>
          )}
          {progressBar >= 100 && <Badge color="success">Success</Badge>}
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={loading} onClick={() => handleUpload()}>
            Upload
          </Button>
          <Button onClick={onClick} color="gray">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProfilePictureModal;
