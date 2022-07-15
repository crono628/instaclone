import { add, isBefore } from 'date-fns';

export function userFactory(user) {
  return {
    name: user.displayName || user.email,
    email: user.email,
    avatar: user.photoURL,
    uid: user.uid,
    followers: [],
    following: [],
    posts: [],
    requestsReceived: [],
    requestsSent: [],
    stillNew: add(new Date(user.metadata.creationTime), { days: 14 }),
  };
}
