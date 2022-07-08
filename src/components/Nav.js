import React from 'react';

export const Nav = ({ user }) => {
  return (
    <div className="bg-cyan-600">
      <div className="flex max-w-3xl justify-between mx-auto">
        <div className="text-3xl cursor-pointer flex-1 font-bold pl-2 py-2 border-2 border-solid border-yellow-500">
          Petstagram
        </div>
        <div className="text-3xl cursor-pointer font-bold px-2 py-2 border-2 border-solid border-yellow-500">
          {user ? user : 'Log in'}
        </div>
      </div>
    </div>
  );
};

export default Nav;
