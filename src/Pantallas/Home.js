import React from 'react'
import styles from './Home.module.css';
import { useUser } from '../Hooks/UserContext';

const Home = () => {
  const {user} = useUser()
  return (
    <div name="Home" className={styles.home}>
      Home
      <>`USER: ${user.username}`</>
      <br/>
      <>`PASS: ${user.password}`</>
      <br/>
      <>`MAIL: ${user.mail}`</>
    </div>
   
  )
}

export default Home