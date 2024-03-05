import React from 'react'
import { Link } from 'react-scroll'
import styles from './Navbar.module.css'
import { useState, useEffect } from 'react';
import { IoHomeSharp } from "react-icons/io5"
import { FaUserCircle } from "react-icons/fa"
import { TbUsersGroup } from "react-icons/tb"
import { IoSettingsSharp } from "react-icons/io5"
import { CgLogOut } from "react-icons/cg";

import logoLomt from '../LoMT-logo.png';


const Navbar = ({ toggleHomeScreen, toggleProfileScreen, toggleClientsScreen, toggleSettingsScreen, handleLogout }) => {
	const [navBarOpen, setNavBarOpen] = useState(false)
	const [navBarOnTop, setNavBarOnTop] = useState(false)
	const [windowDimension, setWindowDimension] = useState({
			with : window.innerWidth,
			height: window.innerHeight
		})
  
	const links=[
		{ id: 1, link: "Home"		,logo: <IoHomeSharp size={24} />	, action: toggleHomeScreen }, 
		{ id: 2, link: "Profile"	,logo: <FaUserCircle size={24} />	, action: toggleProfileScreen },
		{ id: 3, link: "Clients"	,logo: <TbUsersGroup size={24} />	, action: toggleClientsScreen },
		{ id: 4, link: "Settings"	,logo: <IoSettingsSharp size={24} />, action: toggleSettingsScreen },
		{ id: 5, link: "LogOut"	,logo: <CgLogOut size={24}/>, action: handleLogout }
	]


  const handleLinkHover = (e) => {
    if (!navBarOnTop)
			setNavBarOpen(true)
  }
  const handleLinkLeave = (e) => {
    if (!navBarOnTop)
			setNavBarOpen(false)
  }

  const detectDimension = () => {
		setWindowDimension({
			with : window.innerWidth,
			height: window.innerHeight
		})
	}

  useEffect(() => {
    windowDimension.with < 650 ?  setNavBarOnTop(true) : setNavBarOnTop(false)
  }, []);

	useEffect(() => {
    window.addEventListener('resize', detectDimension)
		windowDimension.with < 650 ?  setNavBarOnTop(true) && setNavBarOpen(false): setNavBarOnTop(false)
    return () => {window.removeEventListener('resize', detectDimension)}
  }, [windowDimension]);

  const renderLogo = (size, className) => (
	<p className={className}>
	  <img src={logoLomt} onClick={toggleHomeScreen} height={size} alt='Logo-LoMt'/>
	</p>
  );
  return (
    <div className={!navBarOnTop ? (navBarOpen ?  styles.navBarOpen : styles.navBar) : styles.navBarOnTop}
			onMouseOver={handleLinkHover} onMouseLeave={handleLinkLeave}>
		<>
			{navBarOpen && renderLogo('100px', styles.logo)}
			{!navBarOpen && !navBarOnTop && renderLogo('60px', styles.logo)}
			{navBarOnTop && renderLogo('50px', styles.logoOnTop)}
		</>

			<ul className = {navBarOnTop ? styles.LinkContainerTop : styles.LinkContainer}> 
				{links.map(({ id, link, logo, action }) => (
					<div key={id}>
						<Link
						onClick={action}
						to={link}
						smooth
						duration={100}
						className = {navBarOnTop ? styles.navBarLinkTop : styles.navBarLink}>
							{logo}  {navBarOpen && <span>{link}</span>}
						</Link>
					</div>
				))}
			</ul>
    </div>
  )
}

export default Navbar