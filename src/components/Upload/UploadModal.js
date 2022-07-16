import React, { useRef, useState } from 'react';
import { storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useAuth } from '../Auth/AuthContext';
import { Button, FileInput, Label, Modal, Progress } from 'flowbite-react';
import addPost from './addPost';

export default function UploadModal({ onClick, upload }) {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const [progressBar, setProgressBar] = useState(0);
  const inputRef = useRef();
  const { currentUser } = useAuth();

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
        console.log('Upload is ' + progress + '% done');
        setProgressBar(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          addPost(currentUser, url, caption);
        });
      }
    );
    setLoading(false);
    setCaption('');
    setImage('');
    inputRef.current.value = '';
  };

  return (
    <>
      <Modal show={upload} size="md" popup={true} onClose={onClick}>
        <Modal.Header />
        <Modal.Body>
          <div className="">
            <div id="fileUpload">
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
                helperText="Choose a picture to upload"
              />
            </div>
            <div className="flex text-white p-1 w-full rounded-lg shadow-md border-2 border-gray-300 dark:border-gray-600 ">
              <div className="bg-black">Caption</div>
              <input
                onChange={(e) => setCaption(e.target.value)}
                type="text"
                className="border-transparent focus:border-transparent focus:ring-0"
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
            {progressBar >= 100 && <div>Picture uploaded successfully!</div>}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={loading}
            pill={true}
            onClick={() => {
              handleUpload();
              setTimeout(() => {
                onClick();
                setProgressBar(0);
              }, 3500);
            }}
          >
            Post
          </Button>
          <Button onClick={onClick} pill={true} color="gray">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
