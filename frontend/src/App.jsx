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
import ViewProject from './pages/users/ViewProject';
import UpdateUser from './pages/users/UpdateUser';

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
                <Route exact path='/viewProject/:projectId' element={<ViewProject />} />
                <Route exact path='/updateUser' element={<UpdateUser />} />
                <Route exact path='/profile' element={<Profile />} />
              </Route>
              {/* Do the same for admin */}
              <Route exact path='/userSignup' element={<Signup />} />
              <Route exact path='/userLogin' element={<Login />} />
              <Route exact path='/' element={<Landing />} />
            </Routes>
          </div>
        </div>
      </Router>
    </UserProvider>
  );
}
