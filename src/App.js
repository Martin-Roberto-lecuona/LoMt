
import './App.css';
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
import { UserProvider, useUser } from './Hooks/UserContext';

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [showHome, setShowHome] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [showClients, setShowClients] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  

  const generateToggleFunction = (activeState) =>(
    activeState=activeState.toLowerCase(),
    setShowHome(activeState === 'home'),  
    setShowProfile(activeState === 'profile'),
    setShowClients(activeState === 'clients') ,
    setShowSettings(activeState === 'settings')
  );
  const {user,setUser,checkedRemember} = useUser()
  
  const handleLogout = () => {
    setUser({ username: '', password: '', mail: ''});
    setShowLogin(true)
    localStorage.clear();
  };
  return (
      <div className="App">
        BORRAR ESTO
        {showLogin && <Login setShowLogin={setShowLogin} setShowRegister= {setShowRegister}/>}
        {showRegister && <Register setShowLogin={setShowLogin}  setShowRegister= {setShowRegister}/>}
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
