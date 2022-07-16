import React, { useRef, useState } from 'react';
import { storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useAuth } from '../Auth/AuthContext';
import { Button, Modal } from 'flowbite-react';
import addPost from './addPost';

export default function UploadModal({ onClick, upload }) {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
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
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              <input
                className="rounded-lg shadow-md border-2 border-gray-300 dark:border-gray-600"
                accept="image/png, image/jpeg"
                ref={inputRef}
                type="file"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
            </h3>
            <div className="p-1 w-full rounded-lg shadow-md border-2 border-gray-300 dark:border-gray-600 ">
              <label>
                Caption
                <input
                  onChange={(e) => setCaption(e.target.value)}
                  type="text"
                  className="border-transparent focus:border-transparent focus:ring-0"
                />
              </label>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={loading}
            pill={true}
            onClick={() => {
              handleUpload();
              onClick();
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
