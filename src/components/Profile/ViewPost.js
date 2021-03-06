import {
  AnnotationIcon,
  ThumbUpIcon,
  UserCircleIcon,
} from '@heroicons/react/outline';
import React from 'react';

const ViewPost = ({ post, user }) => {
  return (
    <div className="">
      <div className="text-sm sm:text-lg flex items-center  mb-3">
        {user.profilePicture === null ? (
          <UserCircleIcon className="w-8 h-8 sm:w-16 sm:h-16" />
        ) : (
          <img
            className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-full"
            src={user.profilePicture}
          />
        )}
        <div className="ml-2 w-1/3 relative cursor-pointer">
          {user.username || user.name || user.email}
        </div>
      </div>
      <img
        className="mx-auto mb-5 w-auto h-fit max-h-64 rounded-xl"
        src={post.img}
        alt={post.caption}
      />
      <div className="text-xs sm:text-lg flex flex-row justify-start py-1">
        <div className="pl-2 flex items-center">
          <ThumbUpIcon className="w-4 h-4 sm:w-6 sm:h-6" /> {post.likes.length}
        </div>
        <div className="ml-5 flex items-center">
          <AnnotationIcon className="w-4 h-4 sm:w-6 sm:h-6" />
          {post.comments.length}
        </div>
      </div>
      <div className="p-1 h-8 text-xs sm:text-base text-ellipsis overflow-hidden whitespace-nowrap">
        {post.caption}
      </div>
    </div>
  );
};

export default ViewPost;
