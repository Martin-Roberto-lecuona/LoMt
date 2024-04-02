import React, { useState, useEffect } from 'react'
import '../styles/FadeTransition.css'

interface FadeTransitionProps {
  children: React.ReactNode;
}

const FadeTransition:React.FC<FadeTransitionProps> = ({ children }) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)
  }, [])

  return (
    <div className={show ? 'show' : 'fade'}>
      {children}
    </div>
  )
}

export default FadeTransition