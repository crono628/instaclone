import React from 'react';
import { useAuth } from './Auth/AuthContext';

export const Nav = () => {
  const { logout, currentUser } = useAuth();
  return (
    <div className="bg-cyan-600 sticky top-0 z-50">
      <div className="flex max-w-5xl justify-between mx-auto">
        <div className="flex text-3xl flex-1 font-bold pl-2 py-2 ">
          InstaClone
        </div>
        {currentUser ? (
          <div>
            <button
              onClick={() => logout()}
              className="text-3xl cursor-pointer font-bold px-2 py-2 "
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
