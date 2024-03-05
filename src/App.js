
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
import ReactDOM from 'react-dom';
import React from 'react';
import { UserProvider,useUser } from './Hooks/UserContext';


function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [showHome, setShowHome] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [showClients, setShowClients] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  

  return (
    <UserProvider>
      <div className="App" >
        {showLogin && <Login setShowLogin={setShowLogin} setShowRegister= {setShowRegister}/>}
        {showRegister && <Register setShowLogin={setShowLogin}  setShowRegister= {setShowRegister}/>}
          {!showLogin && !showRegister && (
          <FadeTransition>
          <Navbar 
            toggleHomeScreen={() =>     {setShowHome(true);   setShowProfile(false);   setShowClients(false);  setShowSettings(false)}} 
            toggleProfileScreen={() =>  {setShowHome(false);  setShowProfile(true);    setShowClients(false);  setShowSettings(false)}}
            toggleClientsScreen={() =>  {setShowHome(false);  setShowProfile(false);   setShowClients(true);   setShowSettings(false)}}
            toggleSettingsScreen={() => {setShowHome(false);  setShowProfile(false);   setShowClients(false);  setShowSettings(true)}}
          />

          {showHome && <Home />}
          {showProfile && <Profile/>}
          {showClients && <Clients />}
          {showSettings && <Settings />}
          </FadeTransition>)}
      </div>
    </UserProvider>
  );
}

export default App;
