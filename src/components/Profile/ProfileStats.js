import React from 'react';

const ProfileStats = ({ user }) => {
  return (
    <div className="text-xs sm:text-lg flex w-full justify-around">
      <div className="flex flex-col items-center">
        <div>{user.posts.length}</div>
        <div>Posts</div>
      </div>
      <div className="flex flex-col items-center">
        <div>{user.followers.length}</div>
        <div>Followers</div>
      </div>
      <div className="flex flex-col items-center">
        <div>{user.following.length}</div>
        <div>Following</div>
      </div>
    </div>
  );
};

export default ProfileStats;
