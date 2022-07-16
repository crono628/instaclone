import React, { useRef, useState } from 'react';
import { useAuth } from './Auth/AuthContext';
import UploadModal from './Upload/UploadModal';
import { PlusCircleIcon, SearchIcon } from '@heroicons/react/outline';
import { Button, Label, TextInput } from 'flowbite-react';

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
            <Button color="" onClick={handleSearch}>
              <SearchIcon className={`w-4 h-4 sm:w-6 sm:h-6`} />
            </Button>
            <div className="flex text-xl sm:text-2xl flex-1 font-bold ml-2  ">
              InstaClone
            </div>
          </div>
        ) : (
          <div className="flex items-center ml-2 transition-opacity duration-100">
            <Button color="" onClick={handleSearch}>
              <SearchIcon className={`w-4 h-4 sm:w-6 sm:h-6`} />
            </Button>
            <TextInput id="base" type="text" sizing="sm" />
          </div>
        )}
        <div className="mr-2">
          <Button color="" pill={true} onClick={handleModal}>
            <PlusCircleIcon className="w-4 h-4 sm:w-6 sm:h-6" />
          </Button>
        </div>
      </div>
      <UploadModal onClick={handleModal} upload={upload} />
    </div>
  );
};

export default Nav;
