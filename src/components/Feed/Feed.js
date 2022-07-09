import React from 'react';
import FeedCard from './FeedCard';

const Feed = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <FeedCard key={post.timestamp} post={post} />
      ))}
    </div>
  );
};

export default Feed;
