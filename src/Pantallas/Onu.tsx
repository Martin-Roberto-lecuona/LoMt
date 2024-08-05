import React, { useState } from 'react';
import Table from '../Componentes/Table';
import Formulario from './Formulario';
import { createColumnHelper } from '@tanstack/react-table';
import '../styles/SettingsOption.css';
import '../styles/Zones.css';
import type { FormType } from './Formulario';

const apiOnu = 'http://127.0.0.1:8000/onu';

interface OnuType {
    id: number;
    pon_type: string;
    onu_type: string;
    ethernet_ports: Number;
    wifi: number;
    voip_ports: number;
    catv: number;
    allow_custom_profiles: string;
    capability: string;
}

const addFormCtes: FormType[] = [
    { title: 'id' },
    { title: 'pon type', type: 'checkbox', options: ['GPON', 'EPON'] },
    { title: 'onu type' },
    { title: 'ethernet ports' },
    { title: 'wifi' },
    { title: 'voip ports' },
    { title: 'catv' },
    { title: 'allow custom profiles' },
    { title: 'capability' }
];
const columnHelper = createColumnHelper<OnuType>();

const handleDelete = async (id: number) => {
  const response = await fetch(`${apiOnu}/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    alert(`Zone with ID ${id} deleted successfully.`);
  } else {
    alert('Failed to delete the zone.');
  }
};

const columns = [
    columnHelper.accessor('id', {
      header: () => 'ID',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('pon_type', {
      header: () => 'PON Type',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('onu_type', {
      header: () => 'ONU Type',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('ethernet_ports', {
      header: () => 'Ethernet Ports',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('wifi', {
      header: () => 'WiFi',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('voip_ports', {
      header: () => 'VoIP Ports',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('catv', {
      header: () => 'CATV',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('allow_custom_profiles', {
      header: () => 'Allow Custom Profiles',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('capability', {
      header: () => 'Capability',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('id', {
      header: () => 'Accion',
      cell: (info) => (
        <button onClick={() => handleDelete(info.getValue())}>
          Delete
        </button>
      ),
    }),
  ];
  

const Onu: React.FC<{}> = () => {
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleAdd = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleFormSubmit = () => {
    setShowForm(false);
  };

  return (
    <div>
      {!showForm &&
          <div className='SettingsOptionWrapper'>
            <Table columns={columns} fetchLink={apiOnu} handleAdd={handleAdd} />
          </div>
      }
      {showForm && <Formulario onClose={handleCloseForm} onAdd={handleFormSubmit} api={apiOnu} inputs = {addFormCtes}/>}
    </div>
  );
}

export default Onu;
