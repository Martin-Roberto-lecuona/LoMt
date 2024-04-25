import { AccessorKeyColumnDef, flexRender, getCoreRowModel, SortingState, useReactTable } from '@tanstack/react-table'
import React, { useEffect, useState } from 'react'
import '../styles/Table.css';

interface Props<T> {
	setter : React.Dispatch<React.SetStateAction<T[]>>,
	columns : AccessorKeyColumnDef<T, string>[],
	type : T[],
}


const Table  = <T,>({setter, columns, type }: Props<T>) => {
	const [searchValue, setSearchValue] = useState<string>("")
  const [inputSearch, setInputSearch] = useState<string>("")
  const [sorting, setSorting] = useState<SortingState>([])

	useEffect(() => {
    const fetchUsers = async () => {
      try {
        const order = sorting[0]?.desc ? 'desc' : 'asc'
        const sort = sorting[0]?.id ?? 'username'
        const url = `http://127.0.0.1:8000/users?nameLike=${searchValue}&sort=${sort}&order=${order}`; 
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json(); 
					setter(data)
        } else {
          console.error('Failed to fetch users:', response.statusText);
        }
      } catch (error) {
        console.error('An error occurred while fetching users:', error);
      }
    };

    fetchUsers();
  }, [setter, searchValue, sorting]);

	const table = useReactTable({
		data:type,
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
	<div className='containerTabla'>
		
		<form onSubmit={submitSearch}>
        <input 
					className='searchBar'
          type="text"
          placeholder='Search...'
          value={inputSearch}
          onChange={(e)=>setInputSearch(e.target.value)} />
      </form>
      <table className='table'>
        <thead>
            {table.getHeaderGroups().map(headerGroup=>(
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((h) => (
                <th key={h.id} className='tableHeader'>
                  <div {...{
                      className: h.column.getCanSort() ? 'cursor-pointer select-none' : '',
                      onClick: h.column.getToggleSortingHandler(),}}
                  >
                      {flexRender(
                        h.column.columnDef.header,
                        h.getContext()
                      )}
                      {{
                        asc:'⤴️', desc: '⤵️'
                        }[h.column.getIsSorted() as string] ?? null}
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
                <td key={c.id} className='tableCell'>
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

export default Table