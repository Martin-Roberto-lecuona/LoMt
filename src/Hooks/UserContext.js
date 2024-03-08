import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function useUser(){
    return useContext(UserContext) 
}

export function UserProvider ({ children }){
    const [user, setUser] = useState({
        username: '',
        password: '',
        mail: '',
      });
      const [isLoggedIn, setIsLoggedIn] = useState(false)
      
      const value = {
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn

      }
        return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};



