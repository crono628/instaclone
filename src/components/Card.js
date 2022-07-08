import React from 'react';

const Card = ({ post }) => {
  return (
    <div>
      <div>
        <img src="AVATAR" alt="AVATAR" />
        <div>{post.user}</div>
      </div>
      <img src="PHOTO" alt="PHOTO" />
      <div>{post.caption}</div>
      <div>
        <div>{post.likes}</div>
        <div>{post.comments.length}</div>
      </div>
      <div>{post.comments}</div>
    </div>
  );
};

export default Card;
