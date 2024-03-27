import React from 'react'
import '../styles/Home.css';
import { useUser, UserType } from '../Hooks/UserContext';
 
const Home: React.FC<{}> = () => { 
  const { user }: { user: UserType } = useUser();
  return (
    <div className="home" data-testid="home">
      Home
      <br />
      <>USER: {user.username}</>
      <br />
      <>PASS: {user.password}</>
      <br />
      <>MAIL: {user.mail}</>
    </div>
  )
}

export default Home