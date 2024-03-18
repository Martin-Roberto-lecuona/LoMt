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
    const [showLogin, setShowLogin] = useState(true);
    const [showRegister, setShowRegister] = useState(false);
    
    const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    showRegister,
    setShowRegister
    }
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};



