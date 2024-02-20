import logo from './logo.svg';
import './App.css';
import Home from './Pantallas/Home';
import Navbar from './Componentes/Navbar';
import Clients from './Pantallas/Clients';
import Settings from './Pantallas/Settings';
import Register from './Pantallas/Register'
import Login from './Pantallas/Login'

import { useRef, useState, useEffect } from 'react'

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  return (
    <div className="App">
       {showLogin && <Login setShowLogin={setShowLogin} setShowRegister= {setShowRegister}/>}
       {showRegister && <Register setShowLogin={setShowLogin}  setShowRegister= {setShowRegister}/>}
        {!showLogin && !showRegister && <>
        <Navbar />
        <Home />
        <Clients />
        <Settings />
        </>}
      
      
    </div>
  );
}

export default App;
