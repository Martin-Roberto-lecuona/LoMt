import React from 'react'
import { useRef, useState, useEffect, useContext } from 'react'
import styles from './Register.module.css'
import FadeTransition from '../Componentes/FadeTransition'
import { useUser } from '../Hooks/UserContext';

const APILINK= 'https://dummyjson.com/users'

const Register = ({ setShowLogin, setShowRegister }) => {

  const userRef = useRef()
  const errorRef = useRef()

  const {user,setUser} = useUser()

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
        try {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
            setSuccess(true);
            setShowLogin(false);
        } catch (error) {
            console.error('Error parsing user data from localStorage:', error);
        }
    }
  }, []);

  useEffect(() => {
      userRef.current.focus()
  }, [])
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    const controller = new AbortController();
    try {
      const response = await fetch(`${APILINK}/search?q=${user.username}&limit=1`, {
      signal: controller.signal});
      if (!response.ok) throw new Error('User not found');
    
      const validUser = await response.json();  
      if  (!validUser.users.length || validUser.users[0].username !== user.username || validUser.users[0].password !== user.password)
        throw new Error('User not found');
      
    //   setUser(prev => ({
    //     ...prev,
    //     mail: validUser.users[0].email,})
    //     )

    setUser({...user, mail: validUser.users[0].email});
    const aux = JSON.stringify(user)
    const  userData = JSON.parse(aux);
    userData.mail = validUser.users[0].email
    /// arreglo temporal para guardar el mail en el localStorage
    /// ver como hacer para que renderice el setUser antes de que lo intente guardar en el localStorage
    localStorage.setItem('user', JSON.stringify(userData)); 
    setSuccess(true);
    setShowLogin(false);
      
    } catch (error) {
        console.log('Error fetching user:', error)
        setErrMsg('Error fetching user')
        setSuccess(false)
      }
  }
  const handleRegisterClick  = () => {
      setShowLogin(false)
      setShowRegister(true)
  }
  const handleChange = (e) => {
      setUser({
          ...user,
          [e.target.id]: e.target.value.trim(),
      })
  }

  return (
      <div className={styles.register}>
          {success ? (
              <section>
                  <FadeTransition duration={2}></FadeTransition>
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
                          onChange={handleChange}
                          required
                          className={styles.input}
                          title='User'
                      />

                      <label htmlFor='password' className={styles.label}>Password: </label>
                      <input
                          type='password'
                          id='password'
                          onChange={handleChange}
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