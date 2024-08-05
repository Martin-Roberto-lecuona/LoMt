import React, { useState } from 'react';
import Dropdown from '../Hooks/DropDown';
import '../styles/FilterBar.css';

interface FilterBarProps {
  onFilterChange: (key: string, val: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const [typeState, setTypeState] = useState('');
  const [statusState, setStatusState] = useState('');
  const [signalState, setSignalState] = useState('');

  const handleButtonClick = (name: string, value: string) => {
    onFilterChange(name, value);
    if (name === 'onuType') {
      setTypeState(value);
    } else if (name === 'status') {
      setStatusState(value);
    } else if (name === 'signal') {
      setSignalState(value);
    }
  };

  const opciones = [
    { value: '1', label: 'valor 1' },
    { value: '2', label: 'valor 2' },
    { value: '3', label: 'valor 3' }
  ];
  
  return (
    <div className="filter-bar">
      <div className='type-state'>  
        <button 
          className={typeState === 'epon' ? 'button-active' : ''} 
          onClick={() => handleButtonClick('onuType', 'epon')}
        >
          EPON
        </button>
        <button 
          className={typeState === 'gpon' ? 'button-active' : ''} 
          onClick={() => handleButtonClick('onuType', 'gpon')}
        >
          GPON
        </button>
      </div>
    
      <div className="status-buttons">
        <button 
          className={statusState === 'online' ? 'button-active' : ''} 
          onClick={() => handleButtonClick('status', 'online')}
        >
          Online
        </button>
        <button 
          className={statusState === 'powerfail' ? 'button-active' : ''} 
          onClick={() => handleButtonClick('status', 'powerfail')}
        >
          Powerfail
        </button>
        <button 
          className={statusState === 'loss_of_signal' ? 'button-active' : ''} 
          onClick={() => handleButtonClick('status', 'loss_of_signal')}
        >
          Loss of Signal
        </button>
        <button 
          className={statusState === 'offline' ? 'button-active' : ''} 
          onClick={() => handleButtonClick('status', 'offline')}
        >
          Offline
        </button>
        <button 
          className={statusState === 'admin_disabled' ? 'button-active' : ''} 
          onClick={() => handleButtonClick('status', 'admin_disabled')}
        >
          Admin Disabled
        </button>
      </div>
      
      <div className="signal-buttons">
        <button 
          className={signalState === '1' ? 'button-active' : ''} 
          onClick={() => handleButtonClick('signal', '1')}
        >
          Low
        </button>
        <button 
          className={signalState === '2' ? 'button-active' : ''} 
          onClick={() => handleButtonClick('signal', '2')}
        >
          Medium
        </button>
        <button 
          className={signalState === '3' ? 'button-active' : ''} 
          onClick={() => handleButtonClick('signal', '3')}
        >
          High
        </button>
      </div>
      
      <div className='dropdown-wrapper'>
        <Dropdown name={'OLT'} options={opciones} onChange={(value: string) => handleButtonClick('olt', value)} />
        <Dropdown name={'Board'} options={opciones} onChange={(value: string) => handleButtonClick('board', value)} />
        <Dropdown name={'Port'} options={opciones} onChange={(value: string) => handleButtonClick('port', value)} />
        <Dropdown name={'Zone'} options={opciones} onChange={(value: string) => handleButtonClick('zone', value)} />
        <Dropdown name={'ODB'} options={opciones} onChange={(value: string) => handleButtonClick('odb', value)} />
        <Dropdown name={'Vlan'} options={opciones} onChange={(value: string) => handleButtonClick('vlan', value)} />
        <Dropdown name={'Onu Type'} options={opciones} onChange={(value: string) => handleButtonClick('onuType', value)} />
        <Dropdown name={'Profile'} options={opciones} onChange={(value: string) => handleButtonClick('profile', value)} />
      </div>
    </div>
  );
};

export default FilterBar;
