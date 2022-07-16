export function postFactory(post) {
  return {
    img: post.img,
    caption: post.caption,
    likes: [],
    comments: [],
    timestamp: new Date().getTime(),
  };
}
