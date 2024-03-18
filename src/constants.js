import { useState } from 'react'

export  const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
export const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!'#$%]).{8,24}$/
export const APILINK= 'https://dummyjson.com/users'
  
