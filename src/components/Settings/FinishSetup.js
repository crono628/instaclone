import React, { useState } from 'react';
import UploadModal from '../Upload/UploadModal';
import UsernameModal from './UsernameModal';
import { useAuth } from '../Auth/AuthContext';

const FinishSetup = () => {
  const [username, setUsername] = useState(false);
  const { currentUser } = useAuth();
  return (
    <>
      <div className="my-5 text-center">
        {currentUser.username === null || currentUser.profilePicture === null
          ? 'Finish setting up your account'
          : 'More Settings'}
      </div>
      <div className="my-4 pl-5">Choose a profile picture</div>
      <div onClick={() => setUsername(!username)} className="my-4 pl-5">
        Choose a username
      </div>
      {/* <UploadModal onClick={() => setUpload(!upload)} upload={upload} /> */}
      <UsernameModal onClick={() => setUsername(!username)} show={username} />
    </>
  );
};

export default FinishSetup;
