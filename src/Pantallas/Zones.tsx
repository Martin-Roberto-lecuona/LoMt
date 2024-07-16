import React, { useState } from 'react';
import Table from '../Componentes/Table';
import Formulario from './Formulario';
import { createColumnHelper } from '@tanstack/react-table';
import '../styles/SettingsOption.css';
import '../styles/Zones.css';
import type { FormType } from './Formulario';

const apiZonas = 'http://127.0.0.1:8000/zonas';

interface ZoneType {
  id: number;
  nombre: string;
  estado: string;
}

const columnHelper = createColumnHelper<ZoneType>();
const addFormCtes: FormType[] = [
  { title: 'id' },
  { title: 'nombre' },
  { title: 'estado' },

];
const handleDelete = async (id: number) => {
  const response = await fetch(`${apiZonas}/${id}`, {
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
  columnHelper.accessor('nombre', {
    header: () => 'Nombre',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('estado', {
    header: () => 'Accion',
    cell: (info) => (
      <button onClick={() => handleDelete(info.row.original.id)}>
        Delete
      </button>
    ),
  }),
];

const Zones: React.FC<{}> = () => {
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
            <Table columns={columns} fetchLink={apiZonas} handleAdd={handleAdd} />
            {/* <button className='bottonAdd' onClick={handleAdd}>
              Add
            </button> */}
          </div>
      }
      {showForm && <Formulario onClose={handleCloseForm} onAdd={handleFormSubmit} api={apiZonas} inputs = {addFormCtes}/>}
    </div>
  );
}

export default Zones;
