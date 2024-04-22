import React, { useEffect, useState } from 'react'
import '../styles/Home.css';
import { useUser, UserType } from '../Hooks/UserContext';
import {createColumnHelper, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table"

import {APILINK} from '../constants'


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
  const [clients, setClients] = useState<Array<UserType>>([
    { username:"finding...", mail:"finding...", password:"finding..."},
  ])
  
  useEffect(() => {
    // Define the asynchronous function
    const fetchUsers = async () => {
      try {
        const url = 'http://127.0.0.1:8000/users'; // Your API endpoint
        const response = await fetch(url); // Fetch data from the API
        if (response.ok) {
          const users = await response.json(); // Convert the response to JSON
          setClients(users); // Update the state with the fetched data
        } else {
          console.error('Failed to fetch users:', response.statusText);
        }
      } catch (error) {
        console.error('An error occurred while fetching users:', error);
      }
    };

    fetchUsers();
  }, []);


  const table = useReactTable({
    data:clients,
    columns, 
    debugTable:true,
    getCoreRowModel: getCoreRowModel(),
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


      <form onSubmit={submitSearch}>
        <input 
          type="text"
          placeholder='Search...'
          value={inputSearch}
          onChange={(e)=>setSearchValue(e.target.value)} />
      </form>
      <table className='clientsTable'>
        <thead>
            {table.getHeaderGroups().map(headerGroup=>(
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((h) => (
                <th key={h.id} className='clientsTableCell'>
                  <div>
                    {flexRender(h.column.columnDef.header,
                      h.getContext()
                    )}
                  </div>
                </th>
                ))}
            </tr>
            ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((r)=>(
            <tr key={r.id}>
              {r.getVisibleCells().map((c) => 
                <td key={c.id} className='clientsTableCell'>
                  {flexRender(c.column.columnDef.cell,c.getContext())}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  )
}

export default Home