import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useUser } from '../../components/UserContext';

function Profile() {
  const [user, setUser] = useState([]);
  const { userInfo } = useUser();
  const { userId } = userInfo;

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8080/api/users/${userId}`
      );
      setUser(result.data);
    } catch (error) {
      console.error('Error getting user:', error);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100 font-montserrat'>
      <div className='w-full max-w-4xl bg-white p-8 rounded-md shadow-md'>
        <h1 className='text-2xl font-bold mb-6 text-center text-[#5d7468]'>
          User Information
        </h1>
        {user ? (
          <div className='overflow-x-auto'>
            <table className='min-w-full'>
              <tbody className='bg-white divide-y divide-gray-200'>
                <tr>
                  <td className='px-6 py-4 whitespace-nowrap font-semibold'>
                    ID:
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>{user.userId}</td>
                </tr>
                <tr>
                  <td className='px-6 py-4 whitespace-nowrap font-semibold'>
                    Name:
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    {user.userName}
                  </td>
                </tr>
                <tr>
                  <td className='px-6 py-4 whitespace-nowrap font-semibold'>
                    Contact:
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    {user.userContact}
                  </td>
                </tr>
                <tr>
                  <td className='px-6 py-4 whitespace-nowrap font-semibold'>
                    Email:
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    {user.userEmail}
                  </td>
                </tr>
                <tr>
                  <td className='px-6 py-4 whitespace-nowrap font-semibold'>
                    Password:
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    {user.userPassword}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <p className='text-lg font-semibold'>Loading user...</p>
        )}
        <div className='flex justify-center'>
          <Link
            className='w-1/3 mt-2 flex justify-center text-center bg-green-500 text-white font-semibold py-1 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600'
            to='/updateUser'>
            Update User Info
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Profile;
