import React from 'react'
import styles from './Register.module.css'
import { useUser } from '../Hooks/UserContext';
import NewUserSetter from '../Hooks/NewUserSetter'

const Register = () => {

  const handleLoginClick  = () => {
    setShowLogin(true)
    setShowRegister(false)
  }
	
	const {setShowLogin, setShowRegister} = useUser()
  return (
    <div className={styles.register}>
        <NewUserSetter Title="Register" buttonText="Create account" isUpdate={true}/>
        <p>
          Already have an account?
          <span className='line' onClick={handleLoginClick} > <a>Login</a> </span>
        </p>
    </div>
  )
}

export default Register