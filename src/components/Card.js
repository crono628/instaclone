import React from 'react';

const Card = ({ post }) => {
  console.log(post.avatar);

  return (
    <div className="max-w-md border-8 border-solid rounded-xl border-indigo-600">
      <div>
        <img src={post.avatar} alt="AVATAR" />
        <div>{post.name}</div>
      </div>
      <img src={post.img} alt="PHOTO" />
      <div>{post.caption}</div>
      <div>
        <div>{post.likes}</div>
        {/* <div>{post.comments.length}</div> */}
      </div>
      <div>
        {post.comments.map((item) => (
          <div>
            <div>{item.user}</div>
            <div>{item.comment}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
