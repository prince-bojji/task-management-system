import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

/**
 * Component for updating project status.
 *
 * @returns JSX element representing the update project status page.
 */
function UpdateProjectStatus() {
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

  /**
   * Updates project state with input changes.
   *
   * @param {Object} e - Event object.
   */
  const onInputChange = e => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  /**
   * Handles form submission to update project status.
   *
   * @param {Object} e - Event object.
   */
  const onSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8080/api/projects/${projectId}`,
        project
      );
      alert('Task status updated successfully!');
      navigate(`/project`);
    } catch (error) {
      console.error('Error updating project:', error);
      alert('Error updating project! Please check your inputs and try again.');
    }
  };

  /**
   * Loads project details from the backend.
   */
  useEffect(() => {
    loadProject();
  }, []);

  /**
   * Loads project details from the backend.
   */
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
          Update status
        </h2>
        <form onSubmit={onSubmit}>
          <div className='mb-4'>
            <input
              type='text'
              name='projectName'
              value={projectName}
              placeholder='Project Name'
              readOnly
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
              readOnly
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
              readOnly
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
              className='w-1/3 mt-2 mr-4 flex justify-center text-center bg-green-500 text-white font-semibold py-1 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600'>
              Save
            </button>
            <Link
              className='w-1/3 mt-2 flex justify-center text-center bg-gray-500 text-white font-semibold py-1 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'
              to='/project'>
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProjectStatus;
