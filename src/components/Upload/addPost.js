import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { postFactory } from '../Factories/postFactory';

async function addPost(user, img, caption) {
  const post = {
    img: img,
    caption: caption,
  };
  const postsRef = doc(db, 'instaUsers', user.uid);
  try {
    await updateDoc(postsRef, {
      posts: arrayUnion(postFactory(post)),
    });
    console.log('post added');
  } catch (error) {
    console.log(error);
  }
}

export default addPost;
