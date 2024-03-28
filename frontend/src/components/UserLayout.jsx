import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

/**
 * Layout component for the user interface.
 * Renders the Header component and the nested routes.
 *
 * @returns {JSX.Element} - JSX element representing the user layout.
 */
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
