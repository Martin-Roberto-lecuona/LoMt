import React from 'react'
import '../styles/Home.css';
import { useUser, UserType } from '../Hooks/UserContext';
 
const Home: React.FC<{}> = () => { 
  const { user }: { user: UserType } = useUser();
  return (
    <div className='home' data-testid='home'>
      Home
      <div data-testid='USER' >USER: {user.username}</div>
      <div data-testid='PASS' >PASS: {user.password}</div>
      <div data-testid='MAIL' >MAIL: {user.mail}</div>
    </div>
  )
}

export default Home