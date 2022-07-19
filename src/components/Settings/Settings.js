import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="text-center mt-5 my-5 text-2xl  w-full">Settings</div>
      <div className="my-5 pl-5">Verify Email</div>
      <div className="my-5 pl-5">Change Password</div>
      <div
        onClick={() => {
          navigate('/finish-setup');
        }}
        className="my-5 pl-5"
      >
        More Settings
      </div>
      <div className="my-5 pl-5">Delete Account</div>
    </>
  );
};

export default Settings;
