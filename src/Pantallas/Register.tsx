import React from 'react'
import '../styles/Register.css'
import { useUser } from '../Hooks/UserContext';
import NewUserSetter from '../Hooks/NewUserSetter'

const Register = () => {

  const handleLoginClick  = () => {
    setShowLogin(true)
    setShowRegister(false)
  }
	
	const {setShowLogin, setShowRegister} = useUser()
  return (
    <div className="register">
        <NewUserSetter Title="Register" buttonText="Create account" isUpdate={true}>
          <p className='lineWrapper'>
            Already have an account?
            <span className='line' onClick={handleLoginClick} > <a>Login</a> </span>
          </p>
        </NewUserSetter>
    </div>
  )
}

export default Register