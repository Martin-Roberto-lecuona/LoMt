import React from 'react'
import '../styles/Home.css';
import { useUser, UserType } from '../Hooks/UserContext';
import {createColumnHelper} from "@tanstack/react-table"
import Table from '../Componentes/Table';
import {USERSLINK} from '../constants'
const columnHelper = createColumnHelper<UserType>()

const columns = [
  columnHelper.accessor('username', {
      header: () => 'Nombre ',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('mail', {
      header: () => 'Mail ',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('password', {
      header: () => 'Contraseña ',
      cell: (info) => info.getValue(),
    })
]

const Home: React.FC<{}> = () => { 
  const { user }: { user: UserType } = useUser()

  return (
    <div className='home' data-testid='home'>
      Home
      <div data-testid='USER' >USER: {user.username}</div>
      <div data-testid='PASS' >PASS: {user.password}</div>
      <div data-testid='MAIL' >MAIL: {user.mail}</div>
      
      <Table 
        fetchLink = {USERSLINK}
        columns={columns}
      />
    </div>
  )
}

export default Home