import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../Componentes/Table';
import { createColumnHelper } from '@tanstack/react-table';
import FilterBar from '../Componentes/FilterBar';

const apiClients = 'http://127.0.0.1:8000/clients';

enum Status {
  online = 1,
  powerfail,
  loss_of_signal,
  offline,
  admin_disabled
}

interface ClientType {
  status: Status,
  name: string,
  sn_mac: number,
  onu: string,
  zone: string,
  odb: string,
  signal: number,
  b_r: 'R:DHCP' | 'B:???',
  vlan: number,
  voip: string,
  tv: string,
  type: string,
  auth_date: Date,
}

const columnHelper = createColumnHelper<ClientType>();
const columns = [
  columnHelper.accessor('status', {
    header: () => 'Status',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('name', {
    header: () => 'Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('sn_mac', {
    header: () => 'SN/MAC',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('onu', {
    header: () => 'ONU',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('zone', {
    header: () => 'Zone',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('odb', {
    header: () => 'ODB',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('signal', {
    header: () => 'Signal',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('b_r', {
    header: () => 'B/R',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('vlan', {
    header: () => 'VLAN',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('voip', {
    header: () => 'VOIP',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('tv', {
    header: () => 'TV',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('type', {
    header: () => 'Type',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('auth_date', {
    header: () => 'Auth Date',
    cell: (info) => info.getValue(),
  }),
  // hay un warning de name duplicado, no importa que accesor ponga. No se bien como solucionarlo
  columnHelper.accessor('name', {
    header: () => 'View',
    cell: (info) => <ViewButton sn_mac={info.row.original.sn_mac} />,
  }),
];

const ViewButton: React.FC<{ sn_mac: number }> = ({ sn_mac }) => {
  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate(`/detail/${sn_mac}`);
  }

  return (
    <button onClick={handleViewClick}>
      View
    </button>
  );
}

interface ClientProps {
  filter?: string;
}

interface FiltersType {
  onuType: string;
  status: string;
  signal: string;
}
type FilterKey = keyof FiltersType;

const Clients: React.FC<ClientProps> = ({ filter }) => {
  const [filters, setFilters] = useState<FiltersType>({ onuType: '', status: '', signal: '' });

  // const apiClientsFilter = `${apiClients}?${Object.entries(filters)
  //   .filter(([_, value]) => value)
  //   .map(([key, value]) => `${key}=${value}`)
  //   .join('&')}`;

  const handleFilterChange = (key: string, val: string) => {
    if (key in filters) {
      const keyAux = key as FilterKey;
      setFilters(prevFilters => {
        const newFilters = { ...prevFilters, [keyAux]: prevFilters[keyAux] === val ? '' : val };
        return newFilters;
      });
    }
  };

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  return (
    <div>
      <FilterBar onFilterChange={handleFilterChange} />
      <Table columns={columns} fetchLink={apiClients} />
    </div>
  );
}

export default Clients;
