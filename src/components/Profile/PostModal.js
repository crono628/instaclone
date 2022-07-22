import { Dialog } from '@headlessui/react';
import React, { useRef } from 'react';
import ViewPost from './ViewPost';

const PostModal = ({ open, onClose, value }) => {
  const focusRef = useRef();
  return (
    <div>
      <Dialog
        initialFocus={focusRef}
        className="relative z-50"
        open={open}
        onClose={onClose}
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-sm rounded bg-white px-5 py-2">
            <div ref={focusRef}></div>
            <Dialog.Title>Post</Dialog.Title>
            <ViewPost user={value.user} post={value.post} />
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default PostModal;
