import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.jpg';

/**
 * Component for rendering a menu item with active state based on the current pathname.
 *
 * @param {Object} props - Component props.
 * @param {string} props.link - The link for the menu item.
 * @returns JSX element representing a menu item.
 */
const MenuItem = props => {
  const { pathname } = useLocation();
  const isUserActive = pathname.includes(`/viewUser`);
  const isManageProjectActive =
    pathname.includes(`/addNewProject`) ||
    pathname.includes(`/viewProjectAdmin`) ||
    pathname.includes(`/assignProject`) ||
    pathname.includes(`/editProject`);
  return (
    <Link to={props.link}>
      <li
        className={`border-0 px-5 py-2 my-2 rounded-xl transition-all ${
          pathname === props.link && 'bg-white bg-opacity-80 shadow-md'
        }
        ${
          props.link === '/manageProject' && isManageProjectActive
            ? 'bg-white bg-opacity-80 shadow-md'
            : ''
        }
        ${
          props.link === '/user' && isUserActive
            ? 'bg-white bg-opacity-80 shadow-md'
            : ''
        }
        `}>
        {props.children}
      </li>
    </Link>
  );
};

/**
 * Component for rendering a line used in the menu.
 *
 * @returns JSX element representing a line in the menu.
 */
const MenuLine = () => {
  return (
    <div className='w-full h-[3px] bg-[#5d7468] rounded-full transition-all duration-300'></div>
  );
};

/**
 * Component for rendering the admin header.
 *
 * @returns JSX element representing the admin header.
 */
const AdminHeader = () => {
  const [isOpen, setOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(window.scrollY);

  /**
   * Function to handle scroll event.
   */
  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed lg:sticky top-0 left-0 z-30 w-full transition-all duration-300 bg-[#a8c9df] font-montserrat text-[#5d7468]
        ${scrollPosition > 30 && 'shadow-lg'}`}>
      <nav className='flex flex-wrap justify-between items-center px-4 py-4'>
        <Link to='/Home' className='flex font-unbounded items-center gap-5'>
          <img
            className='h-16 max-h-full w-auto rounded-full'
            src={logo}
            alt='Logo'
          />
          <h1 className='text-md'>Project Management System</h1>
        </Link>
        <div
          className={`lg:hidden w-6 flex flex-col gap-1 justify-center cursor-pointer text-4xl text-[#5d7468]
                ${
                  isOpen &&
                  ' [&>*:nth-child(1)]:translate-y-[7.25px] [&>*:nth-child(1)]:rotate-45 [&>*:nth-child(2)]:opacity-0 [&>*:nth-child(3)]:-translate-y-[7.25px] [&>*:nth-child(3)]:-rotate-45'
                }`}
          onClick={() => setOpen(!isOpen)}>
          <MenuLine></MenuLine>
          <MenuLine></MenuLine>
          <MenuLine></MenuLine>
        </div>
        <ul
          className={`flex flex-col lg:flex-row lg:gap-8 lg:w-fit m-0 w-full text-center list-none overflow-hidden transition-all duration-300 ease-in-out 
                ${isOpen ? 'h-max pt-3 lg:pt-0' : 'h-0 lg:h-fit'}`}>
          <MenuItem link='/homeAdmin'>Home</MenuItem>
          <MenuItem link='/manageProject'>Projects</MenuItem>
          <MenuItem link='/user'>Users</MenuItem>
          <MenuItem link='/'>
            <div className='flex justify-center items-center gap-1 text-red-800'>
              <ion-icon name='log-out-outline'></ion-icon>
              <p>Logout</p>
            </div>
          </MenuItem>
        </ul>
      </nav>
    </header>
  );
};

export default AdminHeader;
