import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from './AdminHeader';

function AdminLayout() {
  return (
    <div>
      <AdminHeader />
      <div className='mt-[72px] lg:mt-0'>
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
