export const USER_REGEX : RegExp = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
export const PASS_REGEX : RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!'#$%]).{8,24}$/
export const APILINK    : string= 'https://dummyjson.com/users'
export const USERSLINK    : string= 'http://127.0.0.1:8000/users'
// export const USERSLINK    : string= 'http://0.0.0.0:8000/users'

export type  color      = 'fondo'|'claro'|'oscuro'|'basico';
export type  sizeButton = 'pequeño'|'chico'|'mediano'|'grande';
export interface Inputs {
    id: number,
    showName: string,
    type: string,
    idInput: string,
    action: React.ChangeEventHandler<HTMLInputElement> ,
    value: string,
    title: string,
}

