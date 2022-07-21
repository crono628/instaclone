import React, { useEffect, useState } from 'react';
import UsernameModal from './UsernameModal';
import { useNavigate } from 'react-router-dom';
import SettingsOption from './SettingsOption';
import { useAuth } from '../Auth/AuthContext';
import { Toast } from 'flowbite-react';
import { CheckIcon } from '@heroicons/react/outline';
import ProfilePictureModal from './ProfilePictureModal';

const Settings = () => {
  const [usernameModal, setUsernameModal] = useState(false);
  const [profilePictureModal, setProfilePictureModal] = useState(false);
  const { currentUser } = useAuth();
  const { username, profilePicture, verified } = currentUser;
  const navigate = useNavigate();

  const messages = {
    username: 'Update username',
    profilePicture: 'Update profile picture',
    verified: 'Verify your email',
  };

  const handleUsernameModal = () => {
    setUsernameModal((prev) => !prev);
  };

  const handleProfilePictureModal = () => {
    setProfilePictureModal((prev) => !prev);
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
        <div onClick={handleProfilePictureModal} className="w-fit">
          <SettingsOption
            boolVal={profilePicture}
            message={messages.profilePicture}
          />
        </div>
        {/* username */}
        <div className="w-fit" onClick={handleUsernameModal}>
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
      <UsernameModal onClick={handleUsernameModal} show={usernameModal} />
      <ProfilePictureModal
        onClick={handleProfilePictureModal}
        upload={profilePictureModal}
      />
    </div>
  );
};

export default Settings;
