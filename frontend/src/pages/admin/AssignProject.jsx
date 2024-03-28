import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

/**
 * Component for assigning a project to a user.
 *
 * @returns JSX element representing the project assignment view.
 */
function AssignProject() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [assignee, setAssignee] = useState('');
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
   * Function to handle change in assignee input field.
   */
  const handleAssigneeChange = e => {
    setAssignee(e.target.value);
  };

  /**
   * Function to handle assigning the project to a user.
   */
  const handleAssignToUser = () => {
    assignUser();
  };

  const assignUser = async () => {
    try {
      const result = await axios.post(
        `http://localhost:8080/api/projects/${projectId}/assign/${assignee}`
      );
      alert('Project assigned!');
      navigate(`/viewProjectAdmin/${projectId}`);
    } catch (error) {
      console.error('Error assigning the project:', error);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100 font-montserrat'>
      <div className='w-full mt-4 mb-4 max-w-4xl bg-white p-8 rounded-md shadow-md'>
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
                <tr>
                  <td className='px-6 py-4 whitespace-no-wrap font-semibold'>
                    Assign to:
                  </td>
                  <td className='px-6 py-4 whitespace-no-wrap'>
                    <input
                      type='text'
                      value={assignee}
                      onChange={handleAssigneeChange}
                      placeholder='Enter user Id'
                      className='px-3 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                    />
                    <button
                      onClick={handleAssignToUser}
                      className='ml-2 px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600'>
                      Assign
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <p className='text-lg font-semibold'>Loading project...</p>
        )}
      </div>
    </div>
  );
}

export default AssignProject;
