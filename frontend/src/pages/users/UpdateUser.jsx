import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../components/UserContext';

function UpdateUser() {
  const { userInfo } = useUser();
  const { userId } = userInfo;
  const navigate = useNavigate();

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
      await axios.put(`http://localhost:8080/api/users/${userId}`, user);
      alert('You have successfully updated user info!');
      navigate('/profile');
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating user! Please check your inputs and try again.');
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/api/users/${userId}`);
    setUser(result.data);
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100 font-montserrat'>
      <div className='w-full max-w-md bg-white p-8 rounded-md shadow-md'>
        <h2 className='text-2xl font-bold mb-6 text-center text-[#5d7468]'>
          Update user info
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
              className='w-full px-3 py-3 border text-black border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-white'
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
              className='w-full px-3 py-3 border text-black border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-white'
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
              className='w-full px-3 py-3 border text-black border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-white'
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
              className='w-full px-3 py-3 border text-black border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-white'
            />
          </div>
          <div className='flex justify-center'>
            <button
              type='submit'
              className='w-full bg-green-500 flex justify-center text-white font-semibold py-3 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600'>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
