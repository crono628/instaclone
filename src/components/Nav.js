import React from 'react';

export const Nav = ({ user }) => {
  return (
    <div className="bg-cyan-600 sticky top-0 z-50">
      <div className="flex max-w-5xl justify-between mx-auto">
        <div className="flex text-3xl flex-1 font-bold pl-2 py-2 ">
          <div className="cursor-pointer ">Petstagram</div>
        </div>
        <div className="text-3xl cursor-pointer font-bold px-2 py-2 ">
          {user ? user : 'Log in'}
        </div>
      </div>
    </div>
  );
};

export default Nav;
