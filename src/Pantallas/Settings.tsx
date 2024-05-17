import React, { useState } from 'react'
import { FaMap } from "react-icons/fa";
import { MdCallSplit } from "react-icons/md";
import { SiMonkeytype } from "react-icons/si";
import { IoSpeedometer } from "react-icons/io5";
import { PiGraphFill } from "react-icons/pi";
import { Link } from 'react-scroll';
import '../styles/Settings.css';

interface ConfOptions {
  id: number,
  link: string,
  logo: JSX.Element,
  action: () => void ,
}

function Settings() {
  const [hoveredName, setHoveredName] = useState<string | null>(null);
  const options: ConfOptions[] = [
    { id: 1, link: "Zones", logo: <FaMap size={24} />, action: () => {} },
    { id: 2, link: "ODBs", logo: <MdCallSplit size={24} />, action: () => {} },
    { id: 3, link: "ONUType", logo: <SiMonkeytype  size={24} />, action: () => {}  },
    { id: 4, link: "SpeedProfiler", logo: <IoSpeedometer size={24} />, action: () => {}  },
    { id: 5, link: "OLTs", logo: <PiGraphFill size={24} />, action: () => {}  }
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
              onMouseEnter={() => setHoveredName(link)}
              onMouseLeave={() => setHoveredName(null)}
            >
              {logo} <span className={'OptionsText'}>{link}</span>
            </Link>
          </li>
        ))}
        <div className= {hoveredName ? "hoveredName": ""}>
          {hoveredName && <p>{hoveredName}</p>}
        </div>
      </div>
    </div>
  )
}

export default Settings