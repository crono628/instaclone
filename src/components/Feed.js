import React from 'react';
import Card from './Card';

const Feed = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <Card key={post.timestamp} post={post} />
      ))}
    </div>
  );
};

export default Feed;
