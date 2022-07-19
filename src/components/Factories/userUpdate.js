import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

// update a user's profile in firebase
async function updateUser(user, key, value) {
  const userRef = doc(db, 'instaUsers', user.uid);
  try {
    await updateDoc(userRef, {
      [key]: value,
    });
  } catch (error) {
    console.log(error);
  }
}

export default updateUser;
