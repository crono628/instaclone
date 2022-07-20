import React, { useRef, useState } from 'react';
import { storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useAuth } from '../Auth/AuthContext';
import { Button, FileInput, Label, Modal, Progress } from 'flowbite-react';
import addPost from './addPost';
import { postFactory } from '../Factories/postFactory';

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
    const imageRef = ref(storage, `instaPics/${currentUser.uid}/${image.name}`);
    const uploadTask = uploadBytesResumable(imageRef, image);
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
            await addPost(currentUser, url, caption);
            const post = { img: url, caption: caption };
            await setCurrentUser({
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
            // className="border-transparent focus:border-transparent focus:ring-0"
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
          {progressBar >= 100 && (
            <div className="text-green-400">Picture uploaded successfully!</div>
          )}
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
