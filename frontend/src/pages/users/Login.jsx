import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../components/UserContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { loginUser } = useUser();

  async function login(event) {
    event.preventDefault();
    try {
      const response = await axios.get('http://localhost:8080/api/users');

      const user = response.data.find(
        user => user.userEmail === email && user.userPassword === password
      );

      if (!user) {
        alert('Email or password is incorrect!');
      } else {
        alert('Login successful!');
        loginUser(user.userId, user.userEmail);
        navigate('/home');
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while logging in.');
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100 font-montserrat'>
      <div className='w-full max-w-md bg-white p-8 rounded-md shadow-md'>
        <form onSubmit={login}>
          <div className='mb-4'>
            <input
              type='email'
              name='userEmail'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder='Email Address'
              className='w-full px-3 py-3 border text-black border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-white'
            />
          </div>
          <div className='mb-4'>
            <input
              type='password'
              name='userPassword'
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder='Password'
              className='w-full px-3 py-3 border text-black border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-white'
            />
          </div>
          <div className='mb-4 flex justify-center'>
            <button
              type='submit'
              className='w-1/3 bg-blue-500 font-semibold text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'>
              Log In
            </button>
          </div>
          <div className='flex justify-center'>
            <Link
              type='button'
              className='w-full bg-green-500 flex justify-center text-white font-semibold py-3 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600'
              to={'/userSignup'}>
              Create new account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
