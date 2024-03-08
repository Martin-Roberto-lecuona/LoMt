import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Register.module.css'
import { useUser } from '../Hooks/UserContext';

const MAIL_REGEX = /^[[a-z]|[A-Z]|[0-9]]+(?:\\.[[a-z]|[A-Z]|[0-9]]+)*@[[a-z]|[A-Z]|[0-9]]+(?:\\.[[a-z]|[A-Z]|[0-9]]+)*$/;
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!'#$%]){8,24}/;
const APILINK= 'https://dummyjson.com/users'

const Register = ({ setShowLogin, setShowRegister }) => {
    
    const mailRef = useRef()
    const userNameRef = useRef()
    const errorRef = useRef()

    const {setUser} = useUser()

    const [newUser, setNewUser] = useState({
        username: '',
        password: '',
        mail: '',
      });

    const [mail, setMail] = useState('')
    const [validMail, setValidMail] = useState(false)
    
    const [userName, setUserName] = useState('')
    const [validName, setValidName] = useState(false)

    const [pass, setPass] = useState('')
    const [validPass, setValidPass] = useState(false)

    const [matchPass, setMatchPass] = useState('')
    const [validMatch, setValidMatch] = useState(false)

    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        mailRef.current.focus()
    }, [])

    useEffect(() => {
        const result = MAIL_REGEX.test(mail)
        setValidMail(result)
    }, [mail])

    useEffect(() => {
        const result = USER_REGEX.test(userName)
        setValidName(result)
    }, [userName])

    useEffect(() => {
        const result = PASS_REGEX.test(pass)
        const match = pass === matchPass
        setValidPass(result)
        setValidMatch(match)
    }, [pass, matchPass])

    useEffect(() => {
        setErrMsg('')
    }, [userName, pass])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const controller = new AbortController();
        try {
            const responseUserName = await fetch(`${APILINK}/search?q=${userName}&limit=1`, {
            signal: controller.signal});
            const responseMail = await fetch(`${APILINK}/search?q=${mail}&limit=1`, {
                signal: controller.signal});
            
            if (!responseUserName.ok) throw new Error('Error')
            if (!responseMail.ok) throw new Error('Error')
            
                
            const validUserName = await responseUserName.json();
            if  (validUserName.users.length !==0 && validUserName.users[0].username === userName)
                throw new Error('User allready exist');

            const validUserMail = await responseMail.json();
            if (validUserMail.users.length !==0 && validUserMail.users[0].email === mail)
                throw new Error('Mail allready exist');
            
            setNewUser({username:userName, password:pass, mail:mail})
            
            const createUserResponse = await fetch(`${APILINK}/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });
    
            if (!createUserResponse.ok) throw new Error('Error creating user');
            
            setUser({username:userName, password:pass, mail:mail});
            setSuccess(true)
            setShowRegister(false)
            setShowLogin(false)

            } catch (error) {
                console.log(error.message);
                setErrMsg(error.message);
                setSuccess(false);
            }
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
                    <label htmlFor='email' className={styles.label}>E-mail: </label>
                        <input
                            type='email'
                            id='email'
                            ref={mailRef}
                            autoComplete='off'
                            onChange={(e) => setMail(e.target.value)}
                            value={mail}
                            required
                            className={styles.input}
                            title='Valid mail is needed.'
                        />
                        {!validMail && mail && <FontAwesomeIcon icon={faTimes} className={styles.iconWrong} />}
                        {validMail && mail && <FontAwesomeIcon icon={faCheck} className={styles.iconRight}  />}
                        <label htmlFor='username' className={styles.label}>Username: </label>
                        <input
                            type='text'
                            id='username'
                            ref={userNameRef}
                            autoComplete='off'
                            onChange={(e) => setUserName(e.target.value)}
                            value={userName}
                            required
                            className={styles.input}
                            title='4-24 characters.<br />Must begin with a letter.<br />Letters, numbers, underscores, hyphens allowed.'
                        />
                        {!validName && userName && <FontAwesomeIcon icon={faTimes} className={styles.iconWrong} />}
                        {validName && userName && <FontAwesomeIcon icon={faCheck} className={styles.iconRight} />}

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
                        {!validPass && pass && <FontAwesomeIcon icon={faTimes} className={styles.iconWrong} />}
                        {validPass && pass && <FontAwesomeIcon icon={faCheck} className={styles.iconRight} />}

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
                        {!validMatch && matchPass && <FontAwesomeIcon icon={faTimes} className={styles.iconWrong} />}
                        {validMatch && matchPass && <FontAwesomeIcon icon={faCheck} className={styles.iconRight} />}

                        <button disabled={!validMail || !validName || !validPass || !validMatch} className={styles.button}> Create account </button>
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