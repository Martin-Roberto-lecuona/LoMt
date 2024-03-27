import React, { createContext, useContext, useState } from "react";

export interface UserType {
  username: string;
  password: string;
  mail: string;
}

export interface UserContextData {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
  showLogin: boolean;
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
  showRegister: boolean;
  setShowRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContext = createContext<UserContextData | undefined>(undefined);

export const useUser = () => {
  const context = useContext<UserContextData | undefined>(UserContext);
  if (!context) {
    throw new Error('useUser debe ser utilizado dentro de un UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserType>({
    username: '',
    password: '',
    mail: '',
  });
  const [showLogin, setShowLogin] = useState<boolean>(true);
  const [showRegister, setShowRegister] = useState<boolean>(false);

  const contextValue: UserContextData = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    showRegister,
    setShowRegister,
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};
