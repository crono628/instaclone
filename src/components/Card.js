import React from 'react';

const Card = ({ post }) => {
  console.log(post.avatar);

  return (
    <div className="max-w-md my-5 mx-auto bg-slate-400 border-8 border-solid rounded-xl border-indigo-600">
      <div className="flex flex-row items-center">
        <img
          className="w-12 h-12 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
          src={post.avatar}
          alt="AVATAR"
        />
        <div className="pl-2">{post.name}</div>
      </div>
      <img src={post.img} alt="PHOTO" />
      <div className="flex justify-between">
        <div className="pl-2 flex-1">{post.caption}</div>
        <div className="px-2">👍 {post.likes}</div>
        <div className="px-2">💬 {post.comments.length}</div>
      </div>
      <hr />
      <div className="flex flex-col justify-between pl-2">
        <div>
          Comments:
          {post.comments.map((item) => (
            <div className="flex flex-row">
              <div>{item.user}</div>--<div>{item.comment}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
