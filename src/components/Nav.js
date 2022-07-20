import React, { useEffect, useRef, useState } from 'react';
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
  const [menu, setMenu] = useState(false);
  const navRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const outsideClick = (e) => {
      if (menu && navRef.current && !navRef.current.contains(e.target)) {
        setMenu(false);
      }
    };
    document.addEventListener('mousedown', outsideClick);
    return () => {
      document.removeEventListener('mousedown', outsideClick);
    };
  }, [menu]);

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
          <div className="relative md:order-2">
            <UserCircleIcon
              onClick={() => setMenu(!menu)}
              className="w-8 h-8 cursor-pointer"
            />
            {menu && (
              <div
                ref={navRef}
                className="w-48 p-1 absolute top-11 right-0 bg-white border-2 border-gray-500 border-solid rounded-lg shadow-lg"
              >
                <Dropdown.Item onClick={handleTitle}>
                  <span className="cursor-pointer block text-sm">
                    {currentUser.username || currentUser.name}
                  </span>
                </Dropdown.Item>
                <Dropdown.Divider />
                {currentUser.verified && (
                  <div>
                    <Dropdown.Item onClick={handleModal}>
                      New Post
                    </Dropdown.Item>
                    <Dropdown.Item>Search</Dropdown.Item>
                    <Dropdown.Item>
                      <Link to="settings">Settings</Link>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                  </div>
                )}
                <Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>
              </div>
            )}
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
