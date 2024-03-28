import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Landing component representing the landing page of the application.
 * Displays options for user and admin login/signup.
 *
 * @returns JSX element representing the landing page.
 */
function Landing() {
  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100 font-montserrat'>
      <div className='w-full max-w-md bg-white p-8 rounded-md shadow-md'>
        <h2 className='text-2xl font-bold mb-6 text-center text-[#5d7468]'>
          Welcome
        </h2>
        <div className='mb-4 flex justify-center'>
          <Link
            type='submit'
            className='w-full flex justify-center bg-blue-500 font-semibold text-white py-5 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
            to={`/userSignup`}>
            User
          </Link>
        </div>
        <div className='flex justify-center'>
          <Link
            type='button'
            className='w-full flex justify-center bg-green-500 text-white font-semibold py-5 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600'
            to={'/adminLogin'}>
            Admin
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
