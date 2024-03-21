import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({ userId: null, userEmail: null });

  const loginUser = (id, email) => {
    setUserInfo({ userId: id, userEmail: email });
  };

  return (
    <UserContext.Provider value={{ userInfo, loginUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
