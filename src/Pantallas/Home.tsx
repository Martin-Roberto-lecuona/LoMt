import React, { useEffect, useState } from 'react'
import '../styles/Home.css';
import { useUser, UserType } from '../Hooks/UserContext';
import {createColumnHelper, flexRender, getCoreRowModel, SortingState, useReactTable} from "@tanstack/react-table"

import {APILINK} from '../constants'

import Table from '../Componentes/Table';

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
  const [searchValue, setSearchValue] = useState<string>("")
  const [inputSearch, setInputSearch] = useState<string>("")
  const [sorting, setSorting] = useState<SortingState>([])
  const [clients, setClients] = useState<Array<UserType>>([
    { username:"finding...", mail:"finding...", password:"finding..."},
  ])
  
  useEffect(() => {
    // Define the asynchronous function
    const fetchUsers = async () => {
      try {
        const order = sorting[0]?.desc ? 'desc' : 'asc'
        const sort = sorting[0]?.id ?? 'username'
        const url = `http://127.0.0.1:8000/users?nameLike=${searchValue}&sort=${sort}&order=${order}`; 
        const response = await fetch(url);
        if (response.ok) {
          const users = await response.json(); 
          setClients(users);
        } else {
          console.error('Failed to fetch users:', response.statusText);
        }
      } catch (error) {
        console.error('An error occurred while fetching users:', error);
      }
    };

    fetchUsers();
  }, [searchValue, sorting]);


  const table = useReactTable({
    data:clients,
    columns, 
    debugTable:true,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    })

  const submitSearch:React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    setSearchValue(inputSearch)
  }

  return (
    <div className='home' data-testid='home'>
      Home
      <div data-testid='USER' >USER: {user.username}</div>
      <div data-testid='PASS' >PASS: {user.password}</div>
      <div data-testid='MAIL' >MAIL: {user.mail}</div>
      
      <Table 
        setter={setClients}
        type={clients}
        columns={columns}
      />
      
    </div>
  )
}

export default Home