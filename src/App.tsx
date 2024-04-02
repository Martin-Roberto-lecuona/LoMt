
import './styles/App.css';
import Home from './Pantallas/Home';
import Navbar from './Componentes/Navbar';
import Clients from './Pantallas/Clients';
import Settings from './Pantallas/Settings';
import Register from './Pantallas/Register'
import Login from './Pantallas/Login'
import Profile from './Pantallas/Profile'
import FadeTransition from './Componentes/FadeTransition'
import { useState  } from 'react'
import React from 'react';
import { useUser } from './Hooks/UserContext';


function App() {
  const [showHome, setShowHome] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [showClients, setShowClients] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  const {user,setUser,showLogin,showRegister,setShowLogin} = useUser()

  const generateToggleFunction = (activeState:string) =>(
    activeState=activeState.toLowerCase(),
    setShowHome(activeState === 'home'),  
    setShowProfile(activeState === 'profile'),
    setShowClients(activeState === 'clients') ,
    setShowSettings(activeState === 'settings')
  );
  
  const handleLogout = () => {
    setUser({ username: '', password: '', mail: ''});
    setShowLogin(true)
    setShowHome(true)
    setShowProfile(false)
    setShowClients(false)
    setShowSettings(false)
    localStorage.clear();
  };
  return (
      <div className="App">
        {showLogin && <Login/>}
        {showRegister && <Register/>}
          {!showLogin && !showRegister  && (
          <FadeTransition>
          <Navbar 
            toggleHomeScreen=     {() =>  {generateToggleFunction('home')}} 
            toggleProfileScreen=  {() =>  {generateToggleFunction('profile')}}
            toggleClientsScreen=  {() =>  {generateToggleFunction('clients')}}
            toggleSettingsScreen= {() =>  {generateToggleFunction('settings')}}
            handleLogout=         {handleLogout}
          />

          {showHome && <Home />}
          {showProfile && <Profile/>}
          {showClients && <Clients />}
          {showSettings && <Settings />}
          </FadeTransition>)}
      </div>
  );
}

export default App;
