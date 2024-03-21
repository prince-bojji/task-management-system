import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';


function UserLayout() {
  return (
    <div>
      <Header />
      <div className='mt-[72px] lg:mt-0'>
        <Outlet />
      </div>
    </div>
  );
}

export default UserLayout;
