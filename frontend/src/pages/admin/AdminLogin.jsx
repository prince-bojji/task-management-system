import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function login(event) {
    event.preventDefault();
    try {
      const response = await axios.get('http://localhost:8080/api/admin');

      const admin = response.data.find(
        admin =>
          admin.adminUsername === email && admin.adminPassword === password
      );

      if (!admin) {
        alert('Email or password is incorrect!');
      } else {
        alert('Login successful!');
        navigate('/homeAdmin');
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
        <h2 className='text-2xl font-bold mb-6 text-center text-[#5d7468]'>
          Administrator
        </h2>
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
          <div className='flex justify-center'>
            <button
              type='submit'
              className='w-1/3 bg-blue-500 font-semibold text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'>
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
