import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../../components/UserContext';
import { Link } from 'react-router-dom';

function Project() {
  const [projects, setProjects] = useState([]);
  const { userInfo } = useUser();
  const { userId } = userInfo;

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const result = await axios.get('http://localhost:8080/api/projects');
      const filteredProjects = result.data.filter(
        project =>
          project.assignedUser && project.assignedUser.userId === userId
      );
      setProjects(filteredProjects);
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100 font-montserrat'>
      <div className='w-full mt-4 mb-4 max-w-4xl bg-white p-8 rounded-md shadow-md'>
        <h1 className='text-2xl font-bold mb-6 text-center text-[#5d7468]'>
          Projects
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
                  Details
                </th>
                <th className='px-6 py-3 bg-gray-50 text-left text-md leading-4 font-medium text-gray-500 uppercase tracking-wider'>
                  Deadline
                </th>
                <th className='px-6 py-3 bg-gray-50 text-left text-md leading-4 font-medium text-gray-500 uppercase tracking-wider'>
                  Status
                </th>
                <th className='px-6 py-3 bg-gray-50 text-left text-md leading-4 font-medium text-gray-500 uppercase tracking-wider'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {projects.map(project => (
                <tr key={project.projectId}>
                  <td className='px-6 py-4 whitespace-no-wrap'>
                    {project.projectId}
                  </td>
                  <td className='px-6 py-4 whitespace-no-wrap'>
                    {project.projectName}
                  </td>
                  <td className='px-6 py-4 whitespace-no-wrap text-justify'>
                    {project.projectDetails}
                  </td>
                  <td className='px-6 py-4 whitespace-no-wrap'>
                    {project.projectDeadline}
                  </td>
                  <td className='px-6 py-4 whitespace-no-wrap'>
                    {project.projectStatus}
                  </td>
                  <td className='px-6 py-4'>
                    <div className='flex flex-col'>
                      <Link
                        className='w-full mt-2 flex justify-center bg-green-500 text-white font-semibold py-1 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600'
                        to={`/viewProject/${project.projectId}`}>
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

export default Project;
