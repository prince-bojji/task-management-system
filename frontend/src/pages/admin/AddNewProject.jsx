import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddNewProject() {
  const [project, setProject] = useState({
    projectName: '',
    projectDetails: '',
    projectDeadline: '',
    projectStatus: '',
  });

  const { projectName, projectDetails, projectDeadline, projectStatus } =
    project;

  const navigate = useNavigate();

  const onInputChange = e => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/projects', project);
      setProject({
        projectName: '',
        projectDetails: '',
        projectDeadline: '',
        projectStatus: '',
      });
      alert('You have successfully added a new project!');
      navigate('/manageProject');
    } catch (error) {
      console.error('Error:', error);
      alert(
        'Error adding a new project! Please check your inputs and try again.'
      );
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100 font-montserrat'>
      <div className='w-full max-w-md bg-white p-8 rounded-md shadow-md'>
        <h2 className='text-2xl font-bold mb-6 text-center text-[#5d7468]'>
          Add new project
        </h2>
        <form onSubmit={onSubmit}>
          <div className='mb-4'>
            <input
              type='text'
              name='projectName'
              value={projectName}
              placeholder='Project Name'
              required
              onChange={onInputChange}
              className='w-full px-3 py-3 border text-black border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-white'
            />
          </div>
          <div className='mb-4'>
            <input
              type='text'
              name='projectDetails'
              value={projectDetails}
              required
              onChange={onInputChange}
              placeholder='Details'
              className='w-full px-3 py-3 border text-black border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-white'
            />
          </div>
          <div className='mb-4'>
            <input
              type='text'
              name='projectDeadline'
              value={projectDeadline}
              required
              onChange={onInputChange}
              placeholder='Deadline'
              className='w-full px-3 py-3 border text-black border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-white'
            />
          </div>
          <div className='mb-4'>
            <input
              type='text'
              name='projectStatus'
              value={projectStatus}
              required
              onChange={onInputChange}
              placeholder='Status'
              className='w-full px-3 py-3 border text-black border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-white'
            />
          </div>
          <div className='flex justify-center'>
            <button
              type='submit'
              className='w-1/3 bg-blue-500 font-semibold text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNewProject;
