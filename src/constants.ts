export const USER_REGEX : RegExp = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
export const PASS_REGEX : RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!'#$%]).{8,24}$/
export const APILINK    : string= 'https://dummyjson.com/users'
export type  color      = 'fondo'|'claro'|'oscuro'|'basico';
export type  sizeButton = 'pequeño'|'chico'|'mediano'|'grande';
