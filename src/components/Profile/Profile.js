import React, { useEffect, useState } from 'react';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import { useAuth } from '../Auth/AuthContext';

const Profile = () => {
  const { currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      setUser({
        name: currentUser.displayName || currentUser.email,
        email: currentUser.email,
        avatar: currentUser.photoURL,
        uid: currentUser.uid,
        followers: [],
        following: [],
        posts: [],
      });
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [currentUser]);
  console.log(currentUser);

  return (
    loading === false && (
      <div className="m-3 ">
        {/* top row */}
        <div className="text-sm sm:text-lg flex items-center py-2 mb-8">
          {user.avatar === null ? (
            <AccountCircleIcon sx={{ height: 45, width: 45 }} />
          ) : (
            <img
              className="w-12 h-12 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
              src={user.avatar}
              alt="AVATAR"
            />
          )}
          <div className="ml-2 w-1/3 ">{user.name}</div>
          {/* stats */}
          <div className="text-xs sm:text-lg flex w-full justify-around">
            <div className="flex flex-col items-center">
              <div>{user.posts.length}</div>
              <div>Posts</div>
            </div>
            <div className="flex flex-col items-center">
              <div>{user.followers.length}</div>
              <div>Followers</div>
            </div>
            <div className="flex flex-col items-center">
              <div>{user.following.length}</div>
              <div>Following</div>
            </div>
          </div>
        </div>
        {/* grid of posts */}
        <div className="grid grid-cols-3 gap-1 ">
          {user.posts.map((post, index) => {
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
                <div className="text-xs sm:text-lg flex flex-row justify-between py-1">
                  <div className="pl-2">
                    <ThumbUpOffAltIcon fontSize="inherit" /> {post.likes}
                  </div>
                  <div className="pr-2">
                    <InsertCommentIcon fontSize="inherit" />
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
