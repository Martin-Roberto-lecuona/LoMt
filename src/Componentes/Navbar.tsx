import React from 'react';
import { Link } from 'react-router-dom';
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
  path: string,
  action?: () => void,
}

interface NavbarProps {
  handleLogout: () => void,
}

const Navbar: React.FC<NavbarProps> = ({ handleLogout }) => {
  const links: NavLink[] = [
    { id: 1, link: "Home", logo: <IoHomeSharp size={24} />, path: "/" },
    { id: 2, link: "Profile", logo: <FaUserCircle size={24} />, path: "/profile" },
    { id: 3, link: "Clients", logo: <TbUsersGroup size={24} />, path: "/clients" },
    { id: 4, link: "Settings", logo: <IoSettingsSharp size={24} />, path: "/settings" },
    { id: 5, link: "LogOut", logo: <CgLogOut size={24} />, path: "#", action: handleLogout }
  ];

  return (
    <div className={'navBar'}>
      <p className={'logo'}>
        <Link to="/">
          <img src={logoLomt} height='60px' alt='Logo-LoMt' />
        </Link>
      </p>

      <ul className={'LinkContainer'}>
        {links.map(({ id, link, logo, path, action }) => (
          <li key={id}>
            {path !== "#" ? (
              <Link to={path} className={'navBarLink'}>
                {logo} <span className={'navBarLinkText'}>{link}</span>
              </Link>
            ) : (
              <a onClick={action} className={'navBarLink'}>
                {logo} <span className={'navBarLinkText'}>{link}</span>
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
