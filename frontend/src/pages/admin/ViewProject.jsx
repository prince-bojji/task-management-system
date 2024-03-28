import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

/**
 * Component for viewing project details.
 *
 * @returns JSX element representing the project details view.
 */
function ViewProject() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const navigate = useNavigate();

  /**
   * Function to fetch project details from the server.
   */
  useEffect(() => {
    getProject();
  }, []);

  const getProject = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8080/api/projects/${projectId}`
      );
      setProject(result.data);
    } catch (error) {
      console.error('Error getting project:', error);
    }
  };

  /**
   * Function to handle the click event for assigning the project.
   */
  const handleAssignProjectClick = () => {
    navigate(`/assignProject/${projectId}`);
  };

  /**
   * Function to delete the project.
   */
  const deleteProject = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/projects/${projectId}`);
      alert('Project deleted!');
      navigate('/manageProject');
    } catch (error) {
      console.error('Error deleting the project:', error);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100 font-montserrat'>
      <div className='w-full max-w-4xl bg-white p-8 rounded-md shadow-md'>
        <h1 className='text-2xl font-bold mb-6 text-center text-[#5d7468]'>
          Project Details
        </h1>
        {project ? (
          <div className='overflow-x-auto'>
            <table className='min-w-full'>
              <tbody className='bg-white divide-y divide-gray-200'>
                <tr>
                  <td className='px-6 py-4 whitespace-no-wrap font-semibold'>
                    ID:
                  </td>
                  <td className='px-6 py-4 whitespace-no-wrap'>
                    {project.projectId}
                  </td>
                </tr>
                <tr>
                  <td className='px-6 py-4 whitespace-no-wrap font-semibold'>
                    Name:
                  </td>
                  <td className='px-6 py-4 whitespace-no-wrap'>
                    {project.projectName}
                  </td>
                </tr>
                <tr>
                  <td className='px-6 py-4 whitespace-no-wrap font-semibold'>
                    Details:
                  </td>
                  <td className='px-6 py-4 whitespace-no-wrap'>
                    {project.projectDetails}
                  </td>
                </tr>
                <tr>
                  <td className='px-6 py-4 whitespace-no-wrap font-semibold'>
                    Deadline:
                  </td>
                  <td className='px-6 py-4 whitespace-no-wrap'>
                    {project.projectDeadline}
                  </td>
                </tr>
                <tr>
                  <td className='px-6 py-4 whitespace-no-wrap font-semibold'>
                    Status:
                  </td>
                  <td className='px-6 py-4 whitespace-no-wrap'>
                    {project.projectStatus}
                  </td>
                </tr>
                <tr>
                  <td className='px-6 py-4 whitespace-no-wrap font-semibold'>
                    Collaborator:
                  </td>
                  <td className='px-6 py-4 whitespace-no-wrap'>
                    {project.assignedUser
                      ? project.assignedUser.userName
                      : 'Not yet assigned'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <p className='text-lg font-semibold'>Loading project...</p>
        )}
        <div className='flex justify-center'>
          <button
            onClick={handleAssignProjectClick}
            className='w-1/5 mt-2 mr-4 flex justify-center text-center bg-green-500 text-white font-semibold py-1 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600'>
            Assign project
          </button>
          <Link
            className='w-1/5 mt-2 mr-4 flex justify-center text-center bg-blue-500 text-white font-semibold py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
            to={`/editProject/${projectId}`}>
            Edit
          </Link>
          <button
            className='w-1/5 mt-2 mr-4 flex justify-center text-center bg-red-500 text-white font-semibold py-1 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600'
            onClick={deleteProject}>
            Delete
          </button>
          <Link
            className='w-1/5 mt-2 flex justify-center text-center bg-gray-500 text-white font-semibold py-1 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'
            to='/manageProject'>
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ViewProject;
