import React from 'react';
import Table from '../Componentes/Table';

import {createColumnHelper} from "@tanstack/react-table"
import '../styles/SettingsOption.css'

interface ZoneType {
    country: string, 
    province: string, 
    town: string, 
    neighborhood: string, 
    other?:string,
}
const columnHelper = createColumnHelper<ZoneType>()

const columns = [
  columnHelper.accessor('country', {
      header: () => 'Pais ',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('province', {
      header: () => 'Provincia ',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('town', {
      header: () => 'Ciudad ',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('neighborhood', {
        header: () => 'Vecindario ',
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('other', {
        header: () => 'Otro ',
        cell: (info) => info.getValue(),
    })
]

const Zones: React.FC<{}> = () => {
    return (
        <div className='SettingsOptionWrapper'>
            ZONAS
            <Table columns={columns} fetchLink={''} />
        </div>
    );
}

export default Zones;
