import React, { useRef, useState } from 'react';
import { useAuth } from './Auth/AuthContext';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { storage } from '../firebase';
import { ref, uploadBytes } from 'firebase/storage';
import UploadModal from './Upload/UploadModal';

export const Nav = () => {
  const { currentUser } = useAuth();
  const [search, setSearch] = useState(false);
  const [upload, setUpload] = useState(false);
  const searchRef = useRef();

  const handleSearch = () => {
    setSearch(!search);
  };

  const handleModal = () => {
    setUpload(!upload);
  };

  return (
    <div>
      <div className="bg-cyan-600 sticky top-0 z-50 h-14 flex items-center max-w-5xl justify-between mx-auto">
        {/* If no user, search toggle feature is unavailable */}
        {!currentUser ? (
          <div className="flex text-2xl sm:text-3xl flex-1 font-bold pl-2 py-2 ">
            InstaClone
          </div>
        ) : !search ? (
          <div className="flex items-center pl-2">
            <IconButton onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
            <div className="flex text-xl sm:text-2xl flex-1 font-bold   ">
              InstaClone
            </div>
          </div>
        ) : (
          <div className="flex items-center ml-2 transition-opacity duration-100">
            <IconButton onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          </div>
        )}
        <div className="mr-2">
          <IconButton onClick={handleModal}>
            <AddBoxIcon />
          </IconButton>
        </div>
      </div>
      <UploadModal onClick={handleModal} upload={upload} />
    </div>
  );
};

export default Nav;
