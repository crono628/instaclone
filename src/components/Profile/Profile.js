import React, { useEffect, useState } from 'react';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import {
  collection,
  doc,
  setDoc,
  query,
  where,
  getDocs,
  getDoc,
} from 'firebase/firestore';
import { useAuth } from '../Auth/AuthContext';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    if (currentUser) {
      setLoading(false);
    }
  }, [currentUser]);

  return (
    loading === false && (
      <div className="m-3 min-h-max">
        {/* top row */}
        <div className="text-sm sm:text-lg flex items-center py-2 mb-8">
          {currentUser.avatar === null ? (
            <AccountCircleIcon sx={{ height: 45, width: 45 }} />
          ) : (
            <AccountCircleIcon sx={{ height: 45, width: 45 }} />
            // <img
            //   className="w-12 h-12 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
            //   src={user.avatar}
            //   alt="AVATAR"
            // />
          )}
          <div
            className="ml-2 w-1/3 relative cursor-pointer hover:bg-slate-300"
            onClick={() => setMenu(!menu)}
          >
            {currentUser.name}
          </div>
          {menu && (
            <div className="flex flex-col absolute mt-40 ml-10  bg-slate-400 p-4 rounded-lg">
              <button
                onClick={() => console.log('settings click')}
                className="hover:bg-slate-300 text-lg sm:text-xl cursor-pointer font-bold py-1 "
              >
                Settings
              </button>
              <button
                onClick={() => logout()}
                className="hover:bg-slate-300  text-lg sm:text-xl cursor-pointer font-bold py-1 "
              >
                Log Out
              </button>
            </div>
          )}
          {/* stats */}
          <div className="text-xs sm:text-lg flex w-full justify-around">
            <div className="flex flex-col items-center">
              <div>{currentUser.posts.length}</div>
              <div>Posts</div>
            </div>
            <div className="flex flex-col items-center">
              <div>{currentUser.followers.length}</div>
              <div>Followers</div>
            </div>
            <div className="flex flex-col items-center">
              <div>{currentUser.following.length}</div>
              <div>Following</div>
            </div>
          </div>
        </div>
        {/* grid of posts */}
        <div className="grid grid-cols-3 gap-1 ">
          {currentUser.posts.map((post, index) => {
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
