import React, { useEffect, useState } from 'react';
import { useAuth } from '../Auth/AuthContext';
import { UserCircleIcon } from '@heroicons/react/outline';
import GridItem from './GridItem';
import ProfileStats from './ProfileStats';
import { Avatar, Modal } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import ViewPost from './ViewPost';

const Profile = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [viewPost, setViewPost] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  const handleClick = (e) => {
    let num = e.target.dataset.postId;
    let post = user.posts[num];
    // navigate(`post`, { replace: true });
    setViewPost(!viewPost);
    return post;
  };

  return (
    loading === false && (
      <div className="m-3 min-h-max">
        {/* top row */}
        <div className="text-sm sm:text-lg flex items-center py-2 mb-8">
          {user.profilePicture === null ? (
            <UserCircleIcon className="w-8 h-8 sm:w-16 sm:h-16" />
          ) : (
            <Avatar img={user.profilePicture} rounded={true} />
          )}
          <div className="ml-2 w-1/3 relative cursor-pointer">
            {user.username || user.name || user.email}
          </div>
          <ProfileStats user={user} />
        </div>
        {/* grid of posts */}
        <div className="grid grid-cols-3 gap-1 ">
          {user.posts.map((post, index) => {
            return (
              <GridItem
                handleClick={(e) => handleClick(e)}
                key={post.caption + index}
                post={post}
                index={index}
              />
            );
          })}
        </div>
        {viewPost && (
          <Modal show={viewPost} position="center" onClose={handleClick}>
            <Modal.Header>Post</Modal.Header>
            <Modal.Body>
              <ViewPost post={handleClick} />
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal>
        )}
      </div>
    )
  );
};

export default Profile;
