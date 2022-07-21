import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

async function addProfilePicture(user, img) {
  const userRef = doc(db, 'instaUsers', user.uid);

  try {
    await updateDoc(userRef, {
      profilePicture: img,
    });
    console.log('profile picture updated');
  } catch (error) {
    console.log(error);
  }
}

export default addProfilePicture;
