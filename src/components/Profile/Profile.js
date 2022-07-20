import React, { useEffect, useState } from 'react';
import { useAuth } from '../Auth/AuthContext';
import { UserCircleIcon } from '@heroicons/react/outline';
import GridItem from './GridItem';
import ProfileStats from './ProfileStats';
import { Avatar } from 'flowbite-react';

const Profile = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (currentUser) {
      setLoading(false);
    }
  }, [currentUser]);

  return (
    loading === false && (
      <div className="m-3 min-h-max">
        {/* top row */}
        <div className="text-sm sm:text-lg flex items-center py-2 mb-8">
          {currentUser.profilePicture === null ? (
            <UserCircleIcon className="w-8 h-8 sm:w-16 sm:h-16" />
          ) : (
            <Avatar img={currentUser.profilePicture} rounded={true} />
          )}
          <div className="ml-2 w-1/3 relative cursor-pointer">
            {currentUser.username || currentUser.name || currentUser.email}
          </div>
          <ProfileStats user={currentUser} />
        </div>
        {/* grid of posts */}
        <div className="grid grid-cols-3 gap-1 ">
          {currentUser.posts.map((post, index) => {
            return (
              <GridItem key={post.caption + index} post={post} index={index} />
            );
          })}
        </div>
      </div>
    )
  );
};

export default Profile;
