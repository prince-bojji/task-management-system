import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

/**
 * Component for displaying a list of users.
 *
 * @returns JSX element representing the list of users.
 */
function User() {
  const [users, setUsers] = useState([]);

  /**
   * Function to load users from the server.
   */
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const result = await axios.get('http://localhost:8080/api/users');
      const response = result.data;
      setUsers(response);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100 font-montserrat'>
      <div className='w-full mt-4 mb-4 max-w-4xl bg-white p-8 rounded-md shadow-md'>
        <h1 className='text-2xl font-bold mb-6 text-center text-[#5d7468]'>
          List of Users
        </h1>
        <div className='overflow-x-auto'>
          <table className='min-w-full'>
            <thead>
              <tr>
                <th className='px-6 py-3 bg-gray-50 text-left text-md leading-4 font-medium text-gray-500 uppercase tracking-wider'>
                  ID
                </th>
                <th className='px-6 py-3 bg-gray-50 text-left text-md leading-4 font-medium text-gray-500 uppercase tracking-wider'>
                  Name
                </th>
                <th className='px-6 py-3 bg-gray-50 text-left text-md leading-4 font-medium text-gray-500 uppercase tracking-wider'>
                  Email
                </th>
                <th className='px-6 py-3 bg-gray-50 text-left text-md leading-4 font-medium text-gray-500 uppercase tracking-wider'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {users.map(user => (
                <tr key={user.userId}>
                  <td className='px-6 py-4 whitespace-no-wrap'>
                    {user.userId}
                  </td>
                  <td className='px-6 py-4 whitespace-no-wrap'>
                    {user.userName}
                  </td>
                  <td className='px-6 py-4 whitespace-no-wrap'>
                    {user.userEmail}
                  </td>
                  <td className='px-6 py-4'>
                    <div className='flex flex-col'>
                      <Link
                        className='w-full mt-2 mr-4 flex justify-center text-center bg-blue-500 text-white font-semibold py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
                        to={`/viewUser/${user.userId}`}>
                        View
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default User;
