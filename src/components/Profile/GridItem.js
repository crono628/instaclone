import { AnnotationIcon, ThumbUpIcon } from '@heroicons/react/outline';
import React from 'react';

const GridItem = ({ post, index }) => {
  const handleClick = (e) => {
    console.log(e.target.dataset.postId);
  };

  return (
    <div className=" w-full bg-lime-50 flex flex-col mx-auto border-solid border-2 border-zinc-800 rounded-lg">
      <div className="flex-1 flex ">
        <img
          className="cursor max-h-24 sm:max-h-48 w-full border-solid border-2 border-zinc-800 bg-neutral-500 object-contain rounded-md "
          src={post.img}
          alt={post.caption}
          data-post-id={index}
          onClick={handleClick}
        />
      </div>
      <div className="p-1 h-8 text-xs sm:text-base text-ellipsis overflow-hidden whitespace-nowrap">
        {post.caption}
      </div>
      <div className="text-xs sm:text-lg flex flex-row justify-between py-1">
        <div className="pl-2 flex items-center">
          <ThumbUpIcon className="w-4 h-4 sm:w-6 sm:h-6" /> {post.likes.length}
        </div>
        <div className="pr-2 flex items-center">
          <AnnotationIcon className="w-4 h-4 sm:w-6 sm:h-6" />
          {post.comments.length}
        </div>
      </div>
    </div>
  );
};

export default GridItem;
