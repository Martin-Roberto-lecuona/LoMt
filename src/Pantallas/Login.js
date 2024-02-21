import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Register.module.css'

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!'#$%]){8,24}/;

const Register = ({ setShowLogin, setShowRegister }) => {

    const userRef = useRef()
    const errorRef = useRef()

    const [user, setUser] = useState('')
    const [validName, setValidName] = useState(false)
    const [userFocus, setUserFocus] = useState(false)

    const [pass, setPass] = useState('')
    const [validPass, setValidPass] = useState(false)
    const [passFocus, setPassFocus] = useState(false)

    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        if (user == '') {
            setValidName(true)
            console.log(user);
        } else {
            const result = USER_REGEX.test(user)
            setValidName(result)
        }
    }, [user])

    useEffect(() => {
        if (pass === '') {
            setValidPass(true)
        } else{
            const result = PASS_REGEX.test(pass)
            setValidPass(result)
        }
    }, [pass])

    useEffect(() => {
        setErrMsg('')
    }, [user, pass])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSuccess(true)
        setShowLogin(false)
    }
    const handleRegisterClick  = () => {
        setShowLogin(false)
        setShowRegister(true)
    }

    return (
        <div className={styles.register}>
            {success ? (
                <section>
                    <h1> You are logged in! </h1>
                    <br />
                    <p>
                        <a href='/' >Go to Home</a>
                    </p>
                </section>
            ) : (
                <div>
                    <p ref={errorRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'>{errMsg}</p>
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='username' className={styles.label}>Username: </label>
                        <input
                            type='text'
                            id='username'
                            ref={userRef}
                            autoComplete='off'
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            className={styles.input}
                            title='User'
                        />

                        <label htmlFor='password' className={styles.label}>Password: </label>
                        <input
                            type='password'
                            id='password'
                            onChange={(e) => setPass(e.target.value)}
                            value={pass}
                            required
                            className={styles.input}
                            title='Password'
                        />

                        <button className={styles.button}> Sign In </button> 
                    </form>
                    
                    
                    <p>
                        
                        Don&apos;t have an account?                        
                        <span className='line' onClick={handleRegisterClick} > <a>Register</a> </span>
                    </p>

                </div>
            )}
        </div>
    )
}

export default Register