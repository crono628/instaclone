export function userFactory(user) {
  return {
    name: user.displayName || user.email,
    email: user.email,
    avatar: user.photoURL,
    uid: user.uid,
    followers: [],
    following: [],
    posts: [],
    requests: [],
  };
}
