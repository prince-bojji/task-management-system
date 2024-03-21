import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [user, setUser] = useState({
    userName: '',
    userContact: '',
    userEmail: '',
    userPassword: '',
  });

  const { userName, userContact, userEmail, userPassword } = user;

  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/users', user);
      setUser({
        userName: '',
        userContact: '',
        userEmail: '',
        userPassword: '',
      });
      alert('You have successfully registered!');
    } catch (error) {
      alert('Error registering user! Please check your inputs and try again.');
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100 font-montserrat'>
      <div className='w-full max-w-md bg-white p-8 rounded-md shadow-md'>
        <h2 className='text-2xl font-semibold mb-6 text-center text-black'>
          Registration Form
        </h2>
        <form onSubmit={onSubmit}>
          <div className='mb-4'>
            <input
              type='text'
              name='userName'
              value={userName}
              placeholder='Name'
              required
              onChange={onInputChange}
              className='w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-white'
            />
          </div>
          <div className='mb-4'>
            <input
              type='text'
              name='userContact'
              value={userContact}
              required
              onChange={onInputChange}
              placeholder='Contact Number'
              className='w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-white'
            />
          </div>
          <div className='mb-4'>
            <input
              type='email'
              name='userEmail'
              value={userEmail}
              required
              onChange={onInputChange}
              placeholder='Email Address'
              className='w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-white'
            />
          </div>
          <div className='mb-4'>
            <input
              type='password'
              name='userPassword'
              value={userPassword}
              required
              onChange={onInputChange}
              placeholder='Password'
              className='w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-white'
            />
          </div>
          <div className='flex justify-center'>
            <button
              type='submit'
              className='w-1/3 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
