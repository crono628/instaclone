import { Dialog, Transition } from '@headlessui/react';
import React, { useRef, Fragment } from 'react';
import ViewPost from './ViewPost';

const PostModal = ({ open, onClose, value }) => {
  const focusRef = useRef();
  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog
          initialFocus={focusRef}
          as="div"
          className="relative z-10"
          onClose={onClose}
        >
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
                  {/* <Dialog.Panel className="mx-auto w-[24rem] h-fit rounded-xl bg-white px-5 py-2"> */}
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Post
                  </Dialog.Title>
                  <div ref={focusRef} className="min-h-[400px]">
                    <ViewPost user={value.user} post={value.post} />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default PostModal;
