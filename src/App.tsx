import './styles/App.css';
import Home from './Pantallas/Home';
import Navbar from './Componentes/Navbar';
import Clients from './Pantallas/Clients';
import Settings from './Pantallas/Settings';
import Register from './Pantallas/Register';
import Login from './Pantallas/Login';
import Profile from './Pantallas/Profile';
import FadeTransition from './Componentes/FadeTransition';
import React from 'react';
import { useUser } from './Hooks/UserContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// Create a client
const queryClient = new QueryClient();

function App() {
  const { setUser, showLogin, showRegister, setShowLogin } = useUser();

  const handleLogout = () => {
    setUser({ username: '', password: '', mail: '' });
    setShowLogin(true);
    localStorage.clear();
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        {showLogin && <Login />}
        {showRegister && <Register />}
        {!showLogin && !showRegister && (
          <Router>
            <Navbar handleLogout={handleLogout} />
            <FadeTransition>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/clients/online" element={<Clients filter='active'/>} />
                <Route path="/clients/offline" element={<Clients filter='inactive'/>} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </FadeTransition>
          </Router>
        )}
        {/* footer */}
      </div>
    </QueryClientProvider>
  );
}

export default App;
