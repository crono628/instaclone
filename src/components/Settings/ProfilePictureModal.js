import React, { useRef, useState } from 'react';
import { storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useAuth } from '../Auth/AuthContext';
import { Badge, FileInput, Label, Progress } from 'flowbite-react';
import addProfilePicture from './addProfilePicture';
import imageCompression from 'browser-image-compression';
import { v4 as uuidv4 } from 'uuid';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

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
      <Transition appear show={upload} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClick}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Choose a profile picture
                  </Dialog.Title>
                  <div className="mt-2">
                    <div>
                      <div className="mb-2 block text-sm text-gray-500">
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
                  <div className="mt-4 flex gap-4">
                    <button
                      disabled={loading}
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => handleUpload()}
                    >
                      Upload
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={onClick}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default ProfilePictureModal;
