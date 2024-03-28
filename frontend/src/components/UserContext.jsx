import React, { createContext, useContext, useState } from 'react';

// Create a context to manage user information
const UserContext = createContext();

/**
 * Custom hook to consume the UserContext.
 *
 * @returns {Object} - The user context.
 */
export const useUser = () => useContext(UserContext);

/**
 * Provider component to manage user information.
 *
 * @param {Object} props - The props for the UserProvider component.
 * @param {React.ReactNode} props.children - The child components.
 * @returns {JSX.Element} - JSX element representing the user provider.
 */
export const UserProvider = ({ children }) => {
  // State to store user information
  const [userInfo, setUserInfo] = useState({ userId: null, userEmail: null });

  // Function to update user information
  const loginUser = (id, email) => {
    setUserInfo({ userId: id, userEmail: email });
  };

  // Provide user context to the child components
  return (
    <UserContext.Provider value={{ userInfo, loginUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
