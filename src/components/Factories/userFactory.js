import { add, isBefore } from 'date-fns';

export function userFactory(user) {
  return {
    name: user.displayName || user.email,
    username: user.usename || null,
    verified: user.emailVerified,
    email: user.email,
    profilePicture: user.profilePicture || null,
    uid: user.uid,
    followers: user.followers || [],
    following: user.following || [],
    posts: user.posts || [],
    requestsReceived: user.requestsReceived || [],
    requestsSent: user.requestsSent || [],
    stillNew: user.stillNew || add(new Date(), { days: 14 }),
  };
}
