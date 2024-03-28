import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from './AdminHeader';

/**
 * Component representing the layout for the admin.
 *
 * @returns JSX element representing the admin layout.
 */
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
