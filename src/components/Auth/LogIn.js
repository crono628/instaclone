import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const LogIn = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, googleLogin, currentUser } = useAuth();

  useEffect(() => {
    if (currentUser !== null) {
      navigate('/');
    }
    // console.log('currentUser', currentUser);
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setError('');
      await login(emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch (error) {
      setError('Invalid email or password');
      setTimeout(() => {
        setError('');
      }, 3000);
    }
    setLoading(false);
  };

  const handleGoogle = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setError('');
      await googleLogin();
      navigate('/');
    } catch (error) {
      setError('Invalid email or password');
      setTimeout(() => {
        setError('');
      }, 3000);
    }
    setLoading(false);
  };

  return (
    <div className="h-[100vh]">
      <div className="flex fixed flex-col py-4 mx-auto left-0 right-0 mt-12 max-w-xs items-center border rounded-md border-black bg-white">
        <p className="text-3xl">Log In</p>
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
            required
          />
          <button
            disabled={loading}
            className="py-2 my-2 rounded-md bg-blue-600 hover:bg-blue-500 text-white"
            type="submit"
          >
            Log In
          </button>
          <div
            onClick={handleGoogle}
            disabled={loading}
            className="py-2 my-2 rounded-md cursor-pointer text-center bg-blue-600 hover:bg-blue-500 text-white"
          >
            Log In With Google
          </div>
        </form>
        <p className="my-2">
          Need an account?{' '}
          <Link className="underline" to="/signup">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LogIn;
