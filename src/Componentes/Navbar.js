import React from 'react'
import { Link } from 'react-scroll'
import styles from './Navbar.module.css'
import { useState } from 'react'
import { CiMenuKebab } from "react-icons/ci";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
    const [navBarOpen, setNavBarOpen] = useState(false)
    const links=[
        {id:1,path:'/',link:"Home"},
        {id:2,path:'/',link:"Clients"},
        {id:3,path:'/',link:"Settings"}
    ]
  return (
    <div className={navBarOpen ?  styles.navBarOpen : styles.navBar}>
        {!navBarOpen && <p>LoMt | fttd software solutions </p>}
        {navBarOpen ? 
            <IoClose onClick={() => setNavBarOpen(false)} size={30} color='antiquewhite' /> : 
            <CiMenuKebab onClick={() => setNavBarOpen(true)} size={30} />
        }
        {
            navBarOpen && (
                <ul>
                    {links.map(x => (
                        <div>
                            <Link
                            onClick={() => setNavBarOpen(false)}
                            to={x.link}
                            smooth
                            duration={500}
                            className = {styles.navBarLink}
                            >{x.link}</Link>
                        </div>
                    ))}
                </ul>
            )  
        }
    </div>
  )
}

export default Navbar