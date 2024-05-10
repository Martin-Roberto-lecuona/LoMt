import { AccessorKeyColumnDef, flexRender, getCoreRowModel, SortingState, useReactTable } from '@tanstack/react-table'
import React, {useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import '../styles/Table.css';

interface Props<T> {
	columns : AccessorKeyColumnDef<T, string>[],
  fetchLink: string
}

const Table  = <T,>({columns,fetchLink}: Props<T>) => {
	const [searchValue, setSearchValue] = useState<string>("")
  const [inputSearch, setInputSearch] = useState<string>("")
  const [sorting, setSorting] = useState<SortingState>([])
  // const queryClient = useQueryClient()

	const fetchUsers = async () => {
    const order = sorting[0]?.desc ? 'desc' : 'asc';
    const sort = sorting[0]?.id ?? 'username';
    const url = `${fetchLink}?nameLike=${searchValue}&sort=${sort}&order=${order}`;
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error('Failed to fetch users');
    }
  };
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['users', searchValue, sorting[0]?.desc ? 'desc' : 'asc'],
    queryFn: fetchUsers,
  });

	const table = useReactTable({
		data: data || [],
		columns, 
		debugTable:true,
		getCoreRowModel: getCoreRowModel(),
		state: {
			sorting,
		},
		onSortingChange: setSorting,
		})

	const submitSearch: React.FormEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault();
      setSearchValue(inputSearch);
      refetch();
  };
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading users</div>;
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