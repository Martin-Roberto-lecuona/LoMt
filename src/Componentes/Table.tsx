import { AccessorKeyColumnDef, flexRender, getCoreRowModel, SortingState, useReactTable } from '@tanstack/react-table'
import React, {useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import '../styles/Table.css';
import { FiRefreshCcw } from "react-icons/fi";
interface Props<T> {
	columns : AccessorKeyColumnDef<T, any>[],
  fetchLink: string
  handleAdd? : () => void
}

const Table  = <T,>({columns,fetchLink,handleAdd}: Props<T>) => {
	const [searchValue, setSearchValue] = useState<string>("")
  const [inputSearch, setInputSearch] = useState<string>("")
  const [sorting, setSorting] = useState<SortingState>([])
  // const queryClient = useQueryClient()

	const fetchData = async () => {
    const order = sorting[0]?.desc ? 'desc' : 'asc';
    const sort = sorting[0]?.id ?? 'id';
    var url = `${fetchLink}?nameLike=${searchValue}&sort=${sort}&order=${order}`;
    if (searchValue === "" && inputSearch === "" && sorting[0]?.id === undefined) {
      url = `${fetchLink}`;
    }
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        console.log("data")
        console.log(data)
        return data;
    } else {
        throw new Error('Failed to fetch table');
    }
  };
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['table', searchValue, sorting[0]?.desc ? 'desc' : 'asc'],
    queryFn: fetchData,
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
    return <div className='containerTabla'>Loading...</div>;
  }

  if (error) {
    return <div className='containerTabla'> Error loading table</div>;
  }
	return (
	<div className='containerTabla'>
		
		<form onSubmit={submitSearch}>
      <div className="controls">
        <input 
					className='searchBar'
          type="text"
          placeholder='Search...'
          value={inputSearch}
          onChange={(e)=>setInputSearch(e.target.value)} />
          <button className='buttonRefetch' onClick={() => {refetch();}}> <FiRefreshCcw /> </button>
          {handleAdd &&  <button className='bottonAdd' onClick={handleAdd}> Add </button>}
        </div>
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