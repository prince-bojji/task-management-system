import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/users/Login';
import Landing from './pages/Landing';
import Signup from './pages/users/Signup';
import UserLayout from './components/UserLayout';
import Home from './pages/users/Home';
import Project from './pages/users/Project';
import Profile from './pages/users/Profile';
import { UserProvider } from './components/UserContext';
import UpdateProjectStatus from './pages/users/UpdateProjectStatus';
import UpdateUser from './pages/users/UpdateUser';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './components/AdminLayout';
import HomeAdmin from './pages/admin/HomeAdmin';
import ManageProject from './pages/admin/ManageProject';
import User from './pages/admin/User';
import ViewProjectAdmin from './pages/admin/ViewProject';
import ViewUser from './pages/admin/ViewUser';
import AddNewProject from './pages/admin/AddNewProject';
import EditProject from './pages/admin/EditProject';
import AssignProject from './pages/admin/AssignProject';

/**
 * Main component handling routing and rendering of different pages in the application.
 *
 * @returns JSX element representing the main application component.
 */
export default function App() {
  return (
    <UserProvider>
      <Router>
        <div className='flex flex-col min-h-screen'>
          <div className='flex-1'>
            <Routes>
              <Route element={<UserLayout />}>
                <Route exact path='/home' element={<Home />} />
                <Route exact path='/project' element={<Project />} />
                <Route exact path='/viewProject/:projectId' element={<UpdateProjectStatus />} />
                <Route exact path='/updateUser' element={<UpdateUser />} />
                <Route exact path='/profile' element={<Profile />} />
              </Route>

              <Route element={<AdminLayout />}>
                <Route exact path='/homeAdmin' element={<HomeAdmin />} />
                <Route exact path='/manageProject' element={<ManageProject />} />
                <Route exact path='/viewProjectAdmin/:projectId' element={<ViewProjectAdmin />} />
                <Route exact path='/addNewProject' element={<AddNewProject />} />
                <Route exact path='/editProject/:projectId' element={<EditProject />} />
                <Route exact path='/assignProject/:projectId' element={<AssignProject />} />
                <Route exact path='/user' element={<User />} />
                <Route exact path='/viewUser/:userId' element={<ViewUser />} />
              </Route>

              <Route exact path='/userSignup' element={<Signup />} />
              <Route exact path='/userLogin' element={<Login />} />
              <Route exact path='/adminLogin' element={<AdminLogin />} />
              <Route exact path='/' element={<Landing />} />
            </Routes>
          </div>
        </div>
      </Router>
    </UserProvider>
  );
}
