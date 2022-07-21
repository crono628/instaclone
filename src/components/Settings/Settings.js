import React, { useEffect, useState } from 'react';
import UsernameModal from './UsernameModal';
import { useNavigate } from 'react-router-dom';
import SettingsOption from './SettingsOption';
import { useAuth } from '../Auth/AuthContext';
import { Toast } from 'flowbite-react';
import { CheckIcon } from '@heroicons/react/outline';

const Settings = () => {
  const [modal, setModal] = useState(false);
  const { currentUser } = useAuth();
  const { username, profilePicture, verified } = currentUser;
  const navigate = useNavigate();

  const messages = {
    username: 'Update username',
    profilePicture: 'Update profile picture',
    verified: 'Verify your email',
  };

  const handleModal = () => {
    setModal((prev) => !prev);
  };

  return (
    <div className="flex flex-col">
      {/* Title changes based on user account completion */}
      <div className="my-8 text-center text-xl">
        {username === null || profilePicture === null || verified === null
          ? 'Finish setting up your account'
          : 'Settings'}
      </div>

      <div className="pl-5">
        {/* profile picture */}
        <div className="w-fit">
          <SettingsOption
            boolVal={profilePicture}
            message={messages.profilePicture}
          />
        </div>
        {/* username */}
        <div className="w-fit" onClick={handleModal}>
          <SettingsOption boolVal={username} message={messages.username} />
        </div>
        {/* email verified */}
        <div className="w-fit">
          <SettingsOption boolVal={verified} message={messages.verified} />
        </div>
        <div className="w-fit">
          <div className="cursor-pointer my-5 p-2 hover:bg-slate-300 w-fit rounded-lg ">
            Change Password
          </div>
        </div>
        <div className="w-fit">
          <div className="cursor-pointer my-5 p-2 hover:bg-slate-300 w-fit rounded-lg ">
            Delete Account
          </div>
        </div>
      </div>

      <div
        onClick={() => navigate('/user-profile')}
        className="cursor-pointer my-8 mx-auto text-xl p-2 hover:bg-slate-300 w-fit rounded-lg "
      >
        Return to your profile
      </div>
      <UsernameModal onClick={handleModal} show={modal} />
    </div>
  );
};

export default Settings;
