import React from 'react'
import { useRef, useState, useEffect } from 'react'
import '../styles/Register.css'
import { useUser, UserType } from './UserContext';
import validator from 'email-validator';
import IconRightOrWrong from '../Componentes/IconRightOrWrong'

import {USER_REGEX,PASS_REGEX,APILINK,Inputs} from '../constants'

interface  Props{
  Title: string,
  buttonText:string,
  isUpdate?:boolean,
  children?: React.ReactNode,
}
interface InputWithCheck extends Inputs{
  valid: boolean,
  dataTestIdWrong:string,
  dataTestIdRight:string,
}

const NewUserSetter = ({Title, buttonText,isUpdate,children}:Props) => {
  
  const mailRef = useRef<HTMLInputElement>(null)
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
      setShowLogin(false)
      setShowRegister(false)

      } catch (error) {
        if (error instanceof Error){
          console.log(error.message);
          setErrMsg(error.message);
        }
      }
  }

  const inputs: InputWithCheck[] = [
    { id: 1, showName:'E-mail:' ,type: 'email', idInput: 'email', action: (e) => setMail(e.target.value), value: mail, title: 'Valid mail is needed.'
      , valid: validMail, dataTestIdWrong:'wrong-mail', dataTestIdRight:'right-mail' },

    { id: 2,showName:'Username:' , type: 'text', idInput: 'username', action: (e) => setUserName(e.target.value), value: userName, title: '4-24 characters. Must begin with a letter. Letters, numbers, underscores, hyphens allowed.'
      , valid: validName, dataTestIdWrong:'wrong-username', dataTestIdRight:'right-username' },

    { id: 3,showName:'Password:' , type: 'password', idInput: 'password', action: (e) => setPass(e.target.value), value: pass, title: '8-24 characters. Must include uppercase and lowercase letters, a number and a special character. Allowed special characters: !#$%'
      , valid: validPass, dataTestIdWrong:'wrong-password', dataTestIdRight:'right-password'},

    { id: 4,showName:'Confirm Password:' , type: 'password', idInput: 'passwordConfirm', action: (e) => setMatchPass(e.target.value), value: matchPass, title: 'Must be the same as the password'
      , valid: validMatch, dataTestIdWrong:'wrong-confirm-password', dataTestIdRight:'right-confirm-password'}
  ];
  return (
    <div className="register">
        <div>
          <p ref={errorRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'>{errMsg}</p>
          <h1>{Title}</h1>
          <form onSubmit={handleSubmit}>
            {inputs.map((input)=>(
              <>
                <label htmlFor={input.idInput} className="label">{input.showName}</label>
                <input
                  type={input.type}
                  id={input.idInput}
                  autoComplete='off'
                  onChange={input.action}
                  value={input.value}
                  required
                  className="input"
                  title={input.title}
                />
                <IconRightOrWrong 
                  valid={input.valid} 
                  text={input.value} 
                  dataTestIdWrong={input.dataTestIdWrong} 
                  dataTestIdRight={input.dataTestIdRight}
                />
              </>
            ))}
            <button disabled={!validMail || !validName || !validPass || !validMatch} className="button"> {buttonText} </button>
          </form>
        </div>
        {children}
    </div>
  )
}

export default NewUserSetter