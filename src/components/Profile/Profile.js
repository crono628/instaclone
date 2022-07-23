import React, { useEffect, useState } from 'react';
import { UserCircleIcon } from '@heroicons/react/outline';
import GridItem from './GridItem';
import ProfileStats from './ProfileStats';
import { useNavigate } from 'react-router-dom';
import PostModal from './PostModal';

const Profile = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  const handleClick = (e) => {
    let num = e.target.dataset.postId;
    let index = user.posts[num];
    setPost(index);
    setModal(true);
  };

  const onClose = () => {
    setModal(false);
  };

  const value = { user, post };

  return (
    loading === false && (
      <div className="m-3 min-h-max">
        {/* top row */}
        <div className="text-sm sm:text-lg flex items-center py-2 mb-4">
          {user.profilePicture === null ? (
            <UserCircleIcon className="w-8 h-8 sm:w-16 sm:h-16" />
          ) : (
            <img
              className="w-16 h-16 sm:w-24 sm:h-24 object-cover  rounded-full"
              src={user.profilePicture}
            />
          )}
          <div className="ml-2 w-1/3 relative cursor-pointer">
            {user.username || user.name || user.email}
          </div>
        </div>
        <div className="mb-8 max-w-[15rem] sm:max-w-md mx-auto">
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
        <PostModal open={modal} onClose={onClose} value={value} />
      </div>
    )
  );
};

export default Profile;
