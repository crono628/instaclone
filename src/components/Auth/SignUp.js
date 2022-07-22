import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const LogIn = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setError('Passwords do not match');
      return setTimeout(() => {
        setError('');
      }, 3000);
    }
    try {
      setLoading(true);
      setError('');
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch (error) {
      setError('Failed account creation');
      console.log(error);

      setTimeout(() => {
        setError('');
      }, 3000);
    }
    setLoading(false);
  };

  return (
    <div className="h-screen">
      <div className="flex fixed flex-col py-4 mx-auto right-0 left-0 mt-24 max-w-xs items-center border rounded-md border-black bg-white">
        <p className="text-3xl">Sign Up</p>
        <p className="h-7 text-red-600">{error}</p>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            className="border border-black rounded-md p-1 mb-3"
            ref={emailRef}
            type="email"
            required
          />
          <label>Password</label>
          <input
            className="border border-black rounded-md p-1 mb-3"
            ref={passwordRef}
            type="password"
            minLength={6}
            required
          />
          <label>Confirm Password</label>
          <input
            className="border border-black rounded-md p-1 mb-3"
            ref={confirmPasswordRef}
            type="password"
            required
          />
          <button
            disabled={loading}
            className="py-2 my-2 rounded-md bg-blue-600 hover:bg-blue-500 text-white"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <p className="my-2">
          Already have an account?{' '}
          <Link className="underline" to="/login">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LogIn;
