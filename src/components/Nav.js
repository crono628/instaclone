import React, { useRef, useState } from 'react';
import { useAuth } from './Auth/AuthContext';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';

export const Nav = () => {
  const { logout, currentUser } = useAuth();
  const [search, setSearch] = useState(false);
  const searchRef = useRef();

  const handleSearch = () => {
    setSearch(!search);
  };

  return (
    <div className="bg-cyan-600 sticky top-0 z-50">
      <div className="flex items-center max-w-5xl justify-between mx-auto">
        {!search ? (
          <div className="flex items-center pl-2">
            <IconButton onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
            <div className="flex text-2xl sm:text-3xl flex-1 font-bold pl-2 py-2 ">
              InstaClone
            </div>
          </div>
        ) : (
          <div className="flex items-center pl-2 transition-opacity duration-100">
            <IconButton onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
            <div className="flex text-2xl sm:text-3xl flex-1 font-bold pl-2 py-2 ">
              <form onSubmit={(e) => e.preventDefault()}>
                <input
                  ref={searchRef}
                  className="flex w-2/3 border bg-cyan-500 rounded-lg text-xl sm:text-2xl"
                />
              </form>
            </div>
          </div>
        )}
        {currentUser ? (
          <div>
            <button
              onClick={() => logout()}
              className="w-max text-2xl sm:text-3xl cursor-pointer font-bold px-2 py-2 "
            >
              Log Out
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Nav;
