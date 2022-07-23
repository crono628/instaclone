import { Dialog, Transition } from '@headlessui/react';
import { Badge } from 'flowbite-react';
import React, { useState, Fragment } from 'react';
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
      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClick}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Choose a username
                  </Dialog.Title>
                  <div>
                    {username === null
                      ? 'Choose a username'
                      : `Current username: ${username}`}
                  </div>
                  <div>
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
                      {badge && (
                        <div className="pt-5">
                          <Badge color="success">Success</Badge>
                        </div>
                      )}
                      <div className="mt-4 flex gap-4">
                        <button
                          disabled={loading}
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        >
                          Submit
                        </button>
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={onClick}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default UsernameModal;
