import React, { useState } from 'react';
import '../styles/Formulario.css'
interface FormularioProps {
  onClose: () => void;
  onAdd: () => void;
  api: string;
  inputs: string[];
}

const Formulario: React.FC<FormularioProps> = ({ onClose, onAdd, api, inputs }) => {
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const response = await fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValues),
    });

    if (response.ok) {
      alert('Data added successfully.');
      onAdd(); // Trigger any additional actions on successful add
      onClose(); // Close the form
    } else {
      alert('Failed to add the data.');
    }
  };

  return (
    <div className="formularioContainer">
      <form onSubmit={handleSubmit}>
        {inputs.map((inputName) => (
          <div key={inputName}>
            <label className="label" >{inputName}:</label>
            <input
              className='input'
              type="text"
              name={inputName}
              value={formValues[inputName] || ''}
              onChange={(e) =>
                setFormValues((prevValues) => ({
                  ...prevValues,
                  [inputName]: e.target.value,
                }))
              }
              required
            />
          </div>
        ))}
        <button type="submit">Add</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}

export default Formulario;
