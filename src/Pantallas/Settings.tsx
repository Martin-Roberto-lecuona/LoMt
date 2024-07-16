import React, { useState } from 'react'
import { FaMap } from "react-icons/fa";
import { MdCallSplit } from "react-icons/md";
import { SiMonkeytype } from "react-icons/si";
import { IoSpeedometer } from "react-icons/io5";
import { PiGraphFill } from "react-icons/pi";
import { Link } from 'react-scroll';
import '../styles/Settings.css';
import Zones from './Zones';
import Onu from './Onu';


interface ConfOptions {
  id: number,
  link: string,
  logo: JSX.Element,
  action: () => void ,
}

function Settings() {
  const [showZones, setShowZones] = useState(true);
  const [showODBs, setShowODBs] = useState(false);
  const [showONUType, setShowONUType] = useState(false);
  const [showSpeedProfiles, setShowSpeedProfiles] = useState(false);
  const [showOLTs, setShowOLTs] = useState(false);

  const ToggleFunction = (selected:string) =>(
    selected=selected.toLowerCase(),
    setShowZones(selected === 'zones'),  
    setShowODBs(selected === 'odb'),
    setShowONUType(selected === 'onu') ,
    setShowSpeedProfiles(selected === 'speed'),
    setShowOLTs(selected === 'olt')
  );
  

  const options: ConfOptions[] = [
    { id: 1, link: "Zones", logo: <FaMap size={24} />, action: () => {ToggleFunction('Zones')} },
    { id: 2, link: "ODBs", logo: <MdCallSplit size={24} />, action: () => {ToggleFunction('ODB')} },
    { id: 3, link: "ONU Types", logo: <SiMonkeytype  size={24} />, action: () => {ToggleFunction('ONU')}  },
    { id: 4, link: "Speed Profiles", logo: <IoSpeedometer size={24} />, action: () => {ToggleFunction('Speed')}  },
    { id: 5, link: "OLTs", logo: <PiGraphFill size={24} />, action: () => {ToggleFunction('OLT')}  }
  ];
  return (
    <div>
       <div className={'OptionsContainer'}>
        {options.map(({ id, link, logo, action }) => (
          <li key={id}>
            <Link
              onClick={action}
              to={link}
              smooth
              duration={100}
              className={'Options'} 
              name={link}
            >
              {logo} <span className={'OptionsText'}>{link}</span>
            </Link>
          </li>
        ))}
      </div>
      {showZones && <Zones />} 
      {showONUType && <Onu />} 
    </div>
  )
}

export default Settings