import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditProject() {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const [project, setProject] = useState({
    projectName: '',
    projectDetails: '',
    projectDeadline: '',
    projectStatus: '',
  });

  const { projectName, projectDetails, projectDeadline, projectStatus } =
    project;

  const onInputChange = e => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8080/api/projects/${projectId}`,
        project
      );
      alert('Project updated successfully!');
      navigate(`/viewProjectAdmin/${project.projectId}`);
    } catch (error) {
      console.error('Error updating project:', error);
      alert('Error updating project! Please check your inputs and try again.');
    }
  };

  useEffect(() => {
    loadProject();
  }, []);

  const loadProject = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8080/api/projects/${projectId}`
      );
      setProject(result.data);
    } catch (error) {
      console.error('Error loading project:', error);
      alert('Error loading project! Please try again later.');
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100 font-montserrat'>
      <div className='w-full max-w-md bg-white p-8 rounded-md shadow-md'>
        <h2 className='text-2xl font-bold mb-6 text-center text-[#5d7468]'>
          Edit Project
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
              placeholder='Project Details'
              required
              onChange={onInputChange}
              className='w-full px-3 py-3 border text-black border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-white'
            />
          </div>
          <div className='mb-4'>
            <input
              type='text'
              name='projectDeadline'
              value={projectDeadline}
              placeholder='Project Deadline'
              required
              onChange={onInputChange}
              className='w-full px-3 py-3 border text-black border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-white'
            />
          </div>
          <div className='mb-4'>
            <input
              type='text'
              name='projectStatus'
              value={projectStatus}
              placeholder='Project Status'
              required
              onChange={onInputChange}
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

export default EditProject;
