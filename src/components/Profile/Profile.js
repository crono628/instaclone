import React, { useEffect, useState } from 'react';
import { useAuth } from '../Auth/AuthContext';
import {
  AnnotationIcon,
  ThumbUpIcon,
  UserCircleIcon,
} from '@heroicons/react/outline';

const Profile = () => {
  const { currentUser, logout } = useAuth();
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
          {currentUser.avatar === null ? (
            <UserCircleIcon className="w-8 h-8 sm:w-16 sm:h-16" />
          ) : (
            <UserCircleIcon className="w-8 h-8 sm:w-16 sm:h-16" />

            // <img
            //   className="w-12 h-12 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
            //   src={user.avatar}
            //   alt="AVATAR"
            // />
          )}
          <div className="ml-2 w-1/3 relative cursor-pointer">
            {currentUser.username || currentUser.name}
          </div>
          {/* stats */}
          <div className="text-xs sm:text-lg flex w-full justify-around">
            <div className="flex flex-col items-center">
              <div>{currentUser.posts.length}</div>
              <div>Posts</div>
            </div>
            <div className="flex flex-col items-center">
              <div>{currentUser.followers.length}</div>
              <div>Followers</div>
            </div>
            <div className="flex flex-col items-center">
              <div>{currentUser.following.length}</div>
              <div>Following</div>
            </div>
          </div>
        </div>
        {/* grid of posts */}
        <div className="grid grid-cols-3 gap-1 ">
          {currentUser.posts.map((post, index) => {
            return (
              <div
                key={post.caption + index}
                className=" w-full bg-lime-50 flex flex-col mx-auto border-solid border-2 border-zinc-800 rounded-lg"
              >
                <div className="flex-1 flex ">
                  <img
                    className="max-h-24 sm:max-h-48 w-full border-solid border-2 border-zinc-800 bg-neutral-500 object-contain rounded-md "
                    src={post.img}
                    alt={post.caption}
                  />
                </div>
                <div className="p-1 h-8 text-xs sm:text-base text-ellipsis overflow-hidden whitespace-nowrap">
                  {post.caption}
                </div>
                <div className="text-xs sm:text-lg flex flex-row justify-between py-1">
                  <div className="pl-2 flex items-center">
                    <ThumbUpIcon className="w-4 h-4 sm:w-6 sm:h-6" />{' '}
                    {post.likes.length}
                  </div>
                  <div className="pr-2 flex items-center">
                    <AnnotationIcon className="w-4 h-4 sm:w-6 sm:h-6" />
                    {post.comments.length}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
};

export default Profile;
