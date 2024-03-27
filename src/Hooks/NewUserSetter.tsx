import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../styles/Register.css'
import { useUser, UserType } from './UserContext';
import validator from 'email-validator';

import {USER_REGEX,PASS_REGEX,APILINK} from '../constants'

interface  Props{
  Title: string;
  buttonText:string;
  isUpdate?:boolean;
}

const NewUserSetter = ({Title, buttonText,isUpdate}:Props) => {
  
  const mailRef = useRef<HTMLInputElement>(null)
  const userNameRef = useRef<HTMLInputElement>(null)
  const errorRef = useRef<HTMLInputElement>(null)

  const {user,setUser,setShowLogin, setShowRegister} = useUser()

  const [newUser, setNewUser] = useState<UserType>({
    username: user.username || '',
    password: user.password || '',
    mail: user.mail || '',
    });

  const [mail, setMail] = useState<string>(newUser.mail)
  const [validMail, setValidMail] = useState<boolean>(false)
  
  const [userName, setUserName] = useState<string>(newUser.username)
  const [validName, setValidName] = useState<boolean>(false)

  const [pass, setPass] = useState<string>('')
  const [validPass, setValidPass] = useState<boolean>(false)

  const [matchPass, setMatchPass] = useState<string>('')
  const [validMatch, setValidMatch] = useState<boolean>(false)

  const [errMsg, setErrMsg] = useState<string>('')
  const [success, setSuccess] = useState<boolean>(false)

  useEffect(() => {
    setTimeout(() => {
      if (mailRef.current) {
        mailRef.current.focus();
      }
    }, 0);
  }, []);
  

  useEffect(() => {
    if(validator.validate(mail)){
      setValidMail(true)
      setMail(mail.toLowerCase())
    }else{
      setValidMail(false)
    }
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

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    // isUpdate will change this function
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
      setShowLogin(false)
      setShowRegister(false)

      } catch (error) {
        if (error instanceof Error){
          console.log(error.message);
          setErrMsg(error.message);
          setSuccess(false);
        }
      }
  }
  
  return (
    <div className="register">
      
        <div>
          <p ref={errorRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'>{errMsg}</p>
          <h1>{Title}</h1>
          <form onSubmit={handleSubmit}>
          <label htmlFor='email' className="label">E-mail: </label>
            <input
              type='email'
              id='email'
              ref={mailRef}
              autoComplete='off'
              onChange={(e) => setMail(e.target.value)}
              value={mail}
              required
              className="input"
              title='Valid mail is needed.'
            />
            {!validMail && mail && <FontAwesomeIcon icon={faTimes} className="iconWrong" data-testid='wrong-mail'/>}
            {validMail && mail && <FontAwesomeIcon icon={faCheck} className="iconRight" data-testid='right-mail'/>}

            <label htmlFor='username' className="label">Username: </label>
            <input
              type='text'
              id='username'
              ref={userNameRef}
              autoComplete='off'
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              required
              className="input"
              title='4-24 characters.<br />Must begin with a letter.<br />Letters, numbers, underscores, hyphens allowed.'
            />
            {!validName && userName && <FontAwesomeIcon icon={faTimes} className="iconWrong" data-testid='wrong-username'/>}
            {validName && userName && <FontAwesomeIcon icon={faCheck} className="iconRight" data-testid='right-username'/>}

            <label htmlFor='password' className="label">Password: </label>
            <input
              type='password'
              id='password'
              onChange={(e) => setPass(e.target.value)}
              value={pass}
              required
              className="input"
              title={`8-24 characters.<br />Must include uppercase and lowercase letters, a number and a special character.<br />Allowed special characters: !#$%`}
            />
            {!validPass && pass && <FontAwesomeIcon icon={faTimes} className="iconWrong" data-testid='wrong-password'/>}
            {validPass && pass && <FontAwesomeIcon icon={faCheck} className="iconRight" data-testid='right-password'/>}

            <label htmlFor='passwordConfirm' className="label">Confirm Password: </label>
            <input
              type='password'
              id='passwordConfirm'
              onChange={(e) => setMatchPass(e.target.value)}
              value={matchPass}
              required
              className="input"
              title='Must be the same as the password'
            />
            {!validMatch && matchPass && <FontAwesomeIcon icon={faTimes} className="iconWrong" data-testid='wrong-confirm-password'/>}
            {validMatch && matchPass && <FontAwesomeIcon icon={faCheck} className="iconRight" data-testid='right-confirm-password'/>}

            <button disabled={!validMail || !validName || !validPass || !validMatch} className="button"> {buttonText} </button>
          </form>
        </div>
    </div>
  )
}

export default NewUserSetter