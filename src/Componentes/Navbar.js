import React from 'react'
import { Link } from 'react-scroll'
import styles from './Navbar.module.css'
import { useState, useEffect } from 'react';
import { IoHomeSharp } from "react-icons/io5"
import { FaUserCircle } from "react-icons/fa"
import { TbUsersGroup } from "react-icons/tb"
import { IoSettingsSharp } from "react-icons/io5"

import logoLomt from '../LoMT-logo.png';


const Navbar = ({ toggleHomeScreen, toggleProfileScreen, toggleClientsScreen, toggleSettingsScreen }) => {
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
		{ id: 4, link: "Settings"	,logo: <IoSettingsSharp size={24} />, action: toggleSettingsScreen }
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


  return (
    <div className={!navBarOnTop ? (navBarOpen ?  styles.navBarOpen : styles.navBar) : styles.navBarOnTop}
			onMouseOver={handleLinkHover} onMouseLeave={handleLinkLeave}>

			{navBarOpen && <p className={styles.logo}><img src={logoLomt} height={'100px'} alt='Logo-LoMt'/></p>}
			{!navBarOpen && !navBarOnTop && <p className={styles.logo}><img src={logoLomt} height={'60px'} alt='Logo-LoMt'/></p>}
			{navBarOnTop && <p className={styles.logoOnTop}><img src={logoLomt} height={'50px'} alt='Logo-LoMt'/></p>}

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