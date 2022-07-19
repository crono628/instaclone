import { doc, updateDoc } from 'firebase/firestore';
import { Button, Label, Modal } from 'flowbite-react';
import React, { useState } from 'react';
import { db } from '../../firebase';
import { useAuth } from '../Auth/AuthContext';
import userUpdate from '../Factories/userUpdate';

const UsernameModal = ({ onClick, show }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const { username } = currentUser;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await userUpdate(currentUser, 'username', input);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <>
      <Modal show={show} size="sm" popup={true} onClose={onClick}>
        <Modal.Header>Choose a username</Modal.Header>
        <Modal.Body>
          {username === null
            ? 'Choose a username'
            : `Current username: ${username}`}
        </Modal.Body>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <input
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Username"
              minLength={5}
              required
            />
            <div className="mt-5">
              <Button disabled={loading} type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UsernameModal;
