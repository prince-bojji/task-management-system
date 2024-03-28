import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FiUser, FiPhone, FiMail, FiLock } from 'react-icons/fi';
import { useUser } from '../../components/UserContext';

/**
 * Component for updating user information.
 *
 * @returns JSX element representing the update user form.
 */
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

  /**
   * Updates the local state with the input field values.
   *
   * @param {Object} e - Event object representing the input change event.
   */
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  /**
   * Submits the updated user information to the backend.
   *
   * @param {Object} e - Event object representing the form submission event.
   */
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

  /**
   * Fetches the user information from the backend on component mount.
   */
  useEffect(() => {
    loadUser();
  }, []);

  /**
   * Fetches the user information from the backend.
   */
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
          <div className='mb-4 flex items-center'>
            <FiUser className='mr-2 text-gray-400' />
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
          <div className='mb-4 flex items-center'>
            <FiPhone className='mr-2 text-gray-400' />
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
          <div className='mb-4 flex items-center'>
            <FiMail className='mr-2 text-gray-400' />
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
          <div className='mb-4 flex items-center'>
            <FiLock className='mr-2 text-gray-400' />
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
              className='w-1/3 mt-2 mr-4 flex justify-center text-center bg-green-500 text-white font-semibold py-1 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600'>
              Save
            </button>
            <Link
              className='w-1/3 mt-2 flex justify-center text-center bg-gray-500 text-white font-semibold py-1 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'
              to='/profile'>
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
