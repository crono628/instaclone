import React, { useEffect, useState } from 'react';
import { useAuth } from './Auth/AuthContext';
import UploadModal from './Upload/UploadModal';
import { UserCircleIcon } from '@heroicons/react/outline';
import {
  Avatar,
  Button,
  Dropdown,
  Label,
  Navbar,
  TextInput,
} from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';

export const Nav = () => {
  const { currentUser, logout } = useAuth();
  const [upload, setUpload] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (currentUser) {
  //     console.log('nav render');
  //   }
  // }, [navigate]);

  const handleModal = () => {
    setUpload(!upload);
  };

  const handleTitle = () => {
    navigate('/');
  };

  return (
    <div className={!currentUser ? 'fixed w-screen' : null}>
      <Navbar fluid={true} rounded={true}>
        <Navbar.Brand onClick={handleTitle}>
          <span className="cursor-pointer self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            InstaClone
          </span>
        </Navbar.Brand>
        {currentUser && (
          <div className="flex md:order-2">
            <Dropdown
              arrowIcon={false}
              inline={true}
              label={
                // <Avatar
                //   alt="User settings"
                //   img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                //   rounded={true}
                // />
                <UserCircleIcon className="w-8 h-8" />
              }
            >
              <Dropdown.Header onClick={handleTitle}>
                <span className="cursor-pointer block text-sm">
                  {currentUser.username || currentUser.name}
                </span>
                <span className="cursor-pointer block truncate text-xs font-medium">
                  {currentUser.email}
                </span>
              </Dropdown.Header>
              {currentUser.verified && (
                <div>
                  <Dropdown.Item onClick={handleModal}>New Post</Dropdown.Item>
                  <Dropdown.Item>Search</Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="settings">Settings</Link>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                </div>
              )}
              <Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>
            </Dropdown>
          </div>
        )}
      </Navbar>
      <UploadModal onClick={handleModal} upload={upload} />
    </div>

    // <div>
    //   <div className="bg-cyan-600 sticky top-0 z-50 h-14 flex items-center w-screen justify-between mx-auto">
    //     {/* If no user, search toggle feature is unavailable */}
    //     {!currentUser ? (
    //       <div className="flex text-2xl sm:text-3xl flex-1 font-bold pl-2 py-2 ">
    //         InstaClone
    //       </div>
    //     ) : !search ? (
    //       <div className="flex items-center pl-2">
    //         <Button color="" onClick={handleSearch}>
    //           <SearchIcon className={`w-4 h-4 sm:w-6 sm:h-6`} />
    //         </Button>
    //         <div className="flex text-xl sm:text-2xl flex-1 font-bold ml-2  ">
    //           InstaClone
    //         </div>
    //       </div>
    //     ) : (
    //       <div className="flex items-center ml-2 transition-opacity duration-100">
    //         <Button color="" onClick={handleSearch}>
    //           <SearchIcon className={`w-4 h-4 sm:w-6 sm:h-6`} />
    //         </Button>
    //         <TextInput id="base" type="text" sizing="sm" />
    //       </div>
    //     )}
    //     <div className="mr-2">
    //       <Button color="" pill={true} onClick={handleModal}>
    //         <PlusCircleIcon className="w-4 h-4 sm:w-6 sm:h-6" />
    //       </Button>
    //     </div>
    //   </div>
    //   <UploadModal onClick={handleModal} upload={upload} />
    // </div>
  );
};

export default Nav;
