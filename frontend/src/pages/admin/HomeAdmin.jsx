import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HomeAdmin() {
  const [projects, setProjects] = useState([]);

  const [projectCount, setProjectCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [ongoingCount, setOngoingCount] = useState(0);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const result = await axios.get('http://localhost:8080/api/projects');
      const response = result.data;
      const totalProjects = response.length;
      const completedProjects = response.filter(
        project => project.projectStatus === 'Completed'
      ).length;
      const ongoingProjects = response.filter(
        project => project.projectStatus === 'Ongoing'
      ).length;

      setProjectCount(totalProjects);
      setCompletedCount(completedProjects);
      setOngoingCount(ongoingProjects);
      setProjects(response);
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };

  const calculatePercentage = (completed, total) => {
    return total !== 0 ? (completed / total) * 100 : 0;
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100 font-montserrat'>
      <div className='w-full max-w-xl bg-white p-8 rounded-md shadow-md'>
        <div className='text-2xl font-bold mb-6 text-center text-[#5d7468]'>
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

export default HomeAdmin;
