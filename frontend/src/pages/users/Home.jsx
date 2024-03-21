import React, { useState } from 'react';

function Home() {
  const [projectCount, setProjectCount] = useState(5);
  const [completedCount, setCompletedCount] = useState(3);
  const [ongoingCount, setOngoingCount] = useState(2);

  const calculatePercentage = (completed, total) => {
    return (completed / total) * 100;
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100 font-montserrat'>
      <div className='w-full max-w-md bg-white p-8 rounded-md shadow-md'>
        <div className='text-2xl flex justify-center font-semibold mb-6'>
          Project Status
        </div>

        <div className='mb-6'>
          <div className='flex justify-between items-center'>
            <div className='text-lg'>Total Projects:</div>
            <div className='text-xl font-bold'>{projectCount}</div>
          </div>
        </div>
        <div className='mb-6'>
          <div className='flex justify-between items-center'>
            <div className='text-lg'>Completed:</div>
            <div className='text-xl font-bold'>{completedCount}</div>
          </div>
          <div className='w-full bg-gray-200 rounded-md h-6 mt-2'>
            <div
              className='h-full rounded-md bg-green-500'
              style={{
                width: `${calculatePercentage(completedCount, projectCount)}%`,
              }}></div>
          </div>
        </div>

        <div className='mb-6'>
          <div className='flex justify-between items-center'>
            <div className='text-lg'>Ongoing:</div>
            <div className='text-xl font-bold'>{ongoingCount}</div>
          </div>
          <div className='w-full bg-gray-200 rounded-md h-6 mt-2'>
            <div
              className='h-full rounded-md bg-blue-500'
              style={{
                width: `${calculatePercentage(ongoingCount, projectCount)}%`,
              }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
