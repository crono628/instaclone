import React, { useEffect, useRef, useState } from 'react';
import { storage } from '../../firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { useAuth } from '../Auth/AuthContext';

export default function Upload() {
  const [image, setImage] = useState('');
  const inputRef = useRef();
  const { currentUser } = useAuth();

  const upload = async () => {
    if (image == null) return;
    const imageRef = ref(storage, `instaPics/${currentUser.uid}/${image.name}`);
    await uploadBytes(imageRef, image).then((snapshot) => {
      inputRef.current.value = '';
    });
  };

  return (
    <div className="invisible absolute">
      <input
        accept="image/png, image/jpeg"
        ref={inputRef}
        type="file"
        onChange={(e) => {
          setImage(e.target.files[0]);
        }}
      />
      <button onClick={upload}>Upload</button>
    </div>
  );
}
