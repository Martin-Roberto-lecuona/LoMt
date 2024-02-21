import React from 'react'
import { Link } from 'react-scroll'
import styles from './Navbar.module.css'
import { useState } from 'react'
import { IoHomeSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { TbUsersGroup } from "react-icons/tb";
import { IoSettingsSharp } from "react-icons/io5";

const Navbar = () => {
    const [navBarOpen, setNavBarOpen] = useState(true)
    const links=[
        {id:1,path:'./Home',link:"Home", logo:<IoHomeSharp />},  
        {id:2, path:'./Profile', link:"Profile",logo:<FaUserCircle />}, 
        {id:3, path:'./Clients', link:"Clients",logo:<TbUsersGroup />},
        {id:4, path:'./Settings', link:"Settings",logo:<IoSettingsSharp />}
    ]
  return (
    <div className={navBarOpen ?  styles.navBarOpen : styles.navBar}>
        {navBarOpen && <p className={styles.titleLogo}>LoMt | fttd software solutions </p>}
        <ul>
            {links.map(x => (
                <div>                
                    <Link
                    onClick={() => setNavBarOpen(false)}
                    to={x.link}
                    smooth
                    duration={500}
                    className = {styles.navBarLink}>
                        {x.logo} {navBarOpen &&  <span className={styles.hideOnMobile}>{x.link}</span>}
                    </Link>
                </div>
            ))}
        </ul> 

    </div>
  )
}

export default Navbar