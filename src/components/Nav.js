import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from './Auth/AuthContext';
import UploadModal from './Upload/UploadModal';
import { UserCircleIcon } from '@heroicons/react/outline';
import { Dropdown, Navbar } from 'flowbite-react';
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
          <div className="cursor-pointer relative md:order-2">
            {currentUser.profilePicture === null ? (
              <UserCircleIcon
                onClick={() => setMenu(!menu)}
                className=" w-8 h-8 sm:w-10 sm:h-10"
              />
            ) : (
              <div>
                <img
                  onClick={() => setMenu(!menu)}
                  className="w-8 h-8 sm:w-10 sm:h-10 object-cover  rounded-full"
                  src={currentUser.profilePicture}
                />
              </div>
            )}
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
  );
};

export default Nav;
