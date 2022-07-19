import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInWithRedirect,
  GoogleAuthProvider,
  getRedirectResult,
} from 'firebase/auth';
import React, { useContext, useEffect, useState, createContext } from 'react';
import { auth, db } from '../../firebase.js';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { userFactory } from '../Factories/userFactory.js';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user === null) {
        setCurrentUser(user);
        setLoading(false);
        return;
      }
      const userRef = doc(db, 'instaUsers', user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setCurrentUser(userSnap.data());
        console.log('user found');
        setLoading(false);
      } else {
        await setDoc(doc(db, 'instaUsers', user.uid), {
          ...userFactory(user),
        });
        setCurrentUser({
          ...userFactory(user),
        });
        setLoading(false);
        console.log('user created');
      }
    });

    return unsubscribe;
  }, []);

  const signup = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  const login = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    return await signOut(auth);
  };

  const googleLogin = async () => {
    const googleProvider = new GoogleAuthProvider();
    return await signInWithRedirect(auth, googleProvider);
  };

  const value = {
    currentUser,
    signup,
    login,
    logout,
    googleLogin,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// const handleGetRedirectResult = async () => {
//   try {
//     const result = await getRedirectResult(auth);
//     console.log(result);
//   } catch (error) {
//     console.log(error);
//   }
// };
// handleGetRedirectResult();
