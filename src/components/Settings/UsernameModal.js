import { CheckIcon } from '@heroicons/react/outline';
import { doc, updateDoc } from 'firebase/firestore';
import { Badge, Button, Label, Modal, Toast } from 'flowbite-react';
import React, { useState } from 'react';
import { db } from '../../firebase';
import { useAuth } from '../Auth/AuthContext';
import userUpdate from '../Factories/userUpdate';

const UsernameModal = ({ onClick, show }) => {
  const [input, setInput] = useState('');
  const [badge, setBadge] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser, setCurrentUser } = useAuth();
  const { username } = currentUser;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await userUpdate(currentUser, 'username', input).then(() => {
        setCurrentUser({ ...currentUser, username: input });
        setBadge(true);
        setTimeout(() => {
          onClick();
          setInput('');
          setBadge(false);
        }, 2000);
      });
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
              className="rounded-lg border-2 border-gray-300 p-2"
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Username"
              minLength={5}
              maxLength={20}
              value={input}
              required
            />
            <div className="mt-5">
              <Button disabled={loading} type="submit">
                Submit
              </Button>
            </div>
          </form>
          {badge && <Badge color="success">Success</Badge>}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UsernameModal;
