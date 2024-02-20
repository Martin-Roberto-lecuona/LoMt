import logo from './logo.svg';
import './App.css';
import Home from './Pantallas/Home';
import Navbar from './Componentes/Navbar';
import Clients from './Pantallas/Clients';
import Settings from './Pantallas/Settings';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Home/>
      <Clients/>
      <Settings/>
      
      
    </div>
  );
}

export default App;
