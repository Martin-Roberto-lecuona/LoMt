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

    const [matchPass, setMatchPass] = useState('')
    const [validMatch, setValidMatch] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)

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
            setValidMatch(true)
        } else{
            const result = PASS_REGEX.test(pass)
            setValidPass(result)
            const match = pass === matchPass
            setValidMatch(match)
        }
    }, [pass, matchPass])

    useEffect(() => {
        setErrMsg('')
    }, [user, pass])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSuccess(true)
        setShowRegister(false)
    }

    const handleLoginClick  = () => {
        setShowLogin(true)
        setShowRegister(false)
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
                    <h1>Register</h1>
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
                            title='4-24 characters.<br />Must begin with a letter.<br />Letters, numbers, underscores, hyphens allowed.'
                        />
                        {!validName && user && <FontAwesomeIcon icon={faTimes} className={styles.icon} />}
                        {validName && user && <FontAwesomeIcon icon={faCheck} className={styles.icon} />}

                        <label htmlFor='password' className={styles.label}>Password: </label>
                        <input
                            type='password'
                            id='password'
                            onChange={(e) => setPass(e.target.value)}
                            value={pass}
                            required
                            className={styles.input}
                            title='8-24 characters.<br />Must include uppercase and lowercase letters, a number and a special character.<br />Allowed special characters: !#$%'
                        />
                        {!validPass && pass && <FontAwesomeIcon icon={faTimes} className={styles.icon} />}
                        {validPass && pass && <FontAwesomeIcon icon={faCheck} className={styles.icon} />}

                        <label htmlFor='passwordConfirm' className={styles.label}>Confirm Password: </label>
                        <input
                            type='password'
                            id='passwordConfirm'
                            onChange={(e) => setMatchPass(e.target.value)}
                            value={matchPass}
                            required
                            className={styles.input}
                            title='Must be the same as the password'
                        />
                        {!validMatch && matchPass && <FontAwesomeIcon icon={faTimes} className={styles.icon} />}
                        {validMatch && matchPass && <FontAwesomeIcon icon={faCheck} className={styles.icon} />}

                        <button disabled={!validName || !validPass || !validMatch} className={styles.button}> Create account </button>
                    </form>

                    <p>
                        Already have an account?
                        <span className='line' onClick={handleLoginClick} > <a>Login</a> </span>
                    </p>

                </div>
            )}
        </div>
    )
}

export default Register