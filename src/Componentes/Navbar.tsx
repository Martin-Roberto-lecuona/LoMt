import React, { useState, useEffect, MouseEvent } from 'react';
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

interface WindowSize {
  width: number;
  height: number;
}

const Navbar: React.FC<NavbarProps> = ({ toggleHomeScreen, toggleProfileScreen, toggleClientsScreen, toggleSettingsScreen, handleLogout }) => {
  const [navBarOpen, setNavBarOpen] = useState<boolean>(false);
  const [navBarOnTop, setNavBarOnTop] = useState<boolean>(false);
  const [windowDimension, setWindowDimension] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const links: NavLink[] = [
    { id: 1, link: "Home", logo: <IoHomeSharp size={24} />, action: toggleHomeScreen },
    { id: 2, link: "Profile", logo: <FaUserCircle size={24} />, action: toggleProfileScreen },
    { id: 3, link: "Clients", logo: <TbUsersGroup size={24} />, action: toggleClientsScreen },
    { id: 4, link: "Settings", logo: <IoSettingsSharp size={24} />, action: toggleSettingsScreen },
    { id: 5, link: "LogOut", logo: <CgLogOut size={24} />, action: handleLogout }
  ];

  const handleLinkHover = () => {
    if (!navBarOnTop)
      setNavBarOpen(true);
  };

  const handleLinkLeave = () => {
    if (!navBarOnTop)
      setNavBarOpen(false);
  };

  const detectDimension = () => {
    setWindowDimension({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  useEffect(() => {
    windowDimension.width < 650 ? setNavBarOnTop(true) : setNavBarOnTop(false);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', detectDimension);
	if (windowDimension.width < 650) {
		setNavBarOnTop(true);
		setNavBarOpen(false);
	} else
		setNavBarOnTop(false);
	
    return () => { window.removeEventListener('resize', detectDimension) };
  }, [windowDimension]);

  const renderLogo = (size: string, className: string) => (
    <p className={className}>
      <img src={logoLomt} onClick={() => toggleHomeScreen()} height={size} alt='Logo-LoMt' />
    </p>
  );

  return (
    <div className={!navBarOnTop ? (navBarOpen ? 'navBarOpen' : 'navBar') : 'navBarOnTop'}
      onMouseOver={handleLinkHover} onMouseLeave={handleLinkLeave}>
      <>
        {navBarOpen && renderLogo('100px', 'logo')}
        {!navBarOpen && !navBarOnTop && renderLogo('60px', 'logo')}
        {navBarOnTop && renderLogo('50px', 'logoOnTop')}
      </>

      <ul className={navBarOnTop ? 'LinkContainerTop' : 'LinkContainer'}>
        {links.map(({ id, link, logo, action }) => (
          <li key={id}>
            <Link
              onClick={action}
              to={link}
              smooth
              duration={100}
              className={navBarOnTop ? 'navBarLinkTop' : 'navBarLink'}>
              {logo} {navBarOpen && <span>{link}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
