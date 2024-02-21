import React, { useState, useEffect } from 'react'
import styles from './FadeTransition.module.css'

const FadeTransition = ({ children }) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)
  }, [])

  return (
    <div className={`${styles.fade} ${show ? styles.show : ''}`} style={{ transitionDuration: `3s`}}>
      {children}
    </div>
  )
}

export default FadeTransition