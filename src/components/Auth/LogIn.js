import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const LogIn = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

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

  return (
    <div className="h-[100vh]">
      <div className="flex flex-col py-4 mx-auto mt-12 max-w-sm items-center border rounded-md border-black bg-white">
        <p className="text-2xl">Log In</p>
        <p className="h-7 text-red-600">{error}</p>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            className="border border-black rounded-md p-1"
            ref={emailRef}
            type="email"
            required
          />
          <label>Password</label>
          <input
            className="border border-black rounded-md p-1"
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
        </form>
        <p>
          Don't have an account?{' '}
          <Link className="underline" to="/signup">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LogIn;
