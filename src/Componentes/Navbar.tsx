import React from 'react';
import { Link } from 'react-scroll';
import '../styles/Navbar.css';
import { IoHomeSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { TbUsersGroup } from "react-icons/tb";
import { IoSettingsSharp } from "react-icons/io5";
import { CgLogOut } from "react-icons/cg";

import logoLomt from '../Images/LoMT-logo.png';

interface NavLink {
  id: number,
  link: string,
  logo: JSX.Element,
  action: () => void ,
}

interface NavbarProps {
  toggleHomeScreen: () => void,
  toggleProfileScreen: () => void,
  toggleClientsScreen: () => void,
  toggleSettingsScreen: () => void,
  handleLogout: () => void,
}

const Navbar: React.FC<NavbarProps> = ({ toggleHomeScreen, toggleProfileScreen, toggleClientsScreen, toggleSettingsScreen, handleLogout }) => {
  const links: NavLink[] = [
    { id: 1, link: "Home", logo: <IoHomeSharp size={24} />, action: toggleHomeScreen },
    { id: 2, link: "Profile", logo: <FaUserCircle size={24} />, action: toggleProfileScreen },
    { id: 3, link: "Clients", logo: <TbUsersGroup size={24} />, action: toggleClientsScreen },
    { id: 4, link: "Settings", logo: <IoSettingsSharp size={24} />, action: toggleSettingsScreen },
    { id: 5, link: "LogOut", logo: <CgLogOut size={24} />, action: handleLogout }
  ];

  return (
    <div className={'navBar'}>
      <p className={'logo'}>
        <img src={logoLomt} onClick={() => toggleHomeScreen()} height = '60px' alt='Logo-LoMt' />
      </p>

      <ul className={'LinkContainer'}>
        {links.map(({ id, link, logo, action }) => (
          <li key={id}>
            <Link
              onClick={action}
              to={link}
              smooth
              duration={100}
              className={'navBarLink'}>
              {logo} <span className={'navBarLinkText'}>{link}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
