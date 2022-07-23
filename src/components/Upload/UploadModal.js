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
import addPost from './addPost';
import { postFactory } from '../Factories/postFactory';
import imageCompression from 'browser-image-compression';
import { v4 as uuidv4 } from 'uuid';

export default function UploadModal({ onClick, upload }) {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
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
      maxWidthOrHeight: 480,
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
          .then((url) => {
            addPost(currentUser, url, caption);
            const post = { img: url, caption: caption };
            setCurrentUser({
              ...currentUser,
              posts: [...currentUser.posts, postFactory(post)],
            });
          })
          .then(
            setTimeout(() => {
              onClick();
              setProgressBar(0);
              setLoading(false);
              setCaption('');
              setImage(null);
              inputRef.current.value = '';
            }, 1500)
          );
      }
    );
  };

  return (
    <>
      <Modal show={upload} size="md" popup={true} onClose={onClick}>
        <Modal.Header>Upload a photo</Modal.Header>
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
          <div className="mt-7">
            <Label htmlFor="caption-input">Caption </Label>
          </div>
          <input
            value={caption}
            id="caption-input"
            onChange={(e) => setCaption(e.target.value)}
            type="text"
            className="rounded-lg border-2 border-gray-300 p-2 mt-2 w-full"
          />
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
            Post
          </Button>
          <Button onClick={onClick} color="gray">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
