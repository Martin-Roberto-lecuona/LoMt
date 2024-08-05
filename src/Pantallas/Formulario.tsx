import React, { useState } from 'react';
import '../styles/Formulario.css';

export interface FormType {
  title: string;
  type?: 'checkbox' | 'text' | 'number' | 'select' | 'file' | 'radio' | 'range' | 'email' | 'url' | 'tel';
  options?: string[];
}

interface FormularioProps {
  onClose: () => void;
  onAdd: () => void;
  api: string;
  inputs: FormType[];
}

const Formulario: React.FC<FormularioProps> = ({ onClose, onAdd, api, inputs }) => {
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});


  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log(formValues) 
    const formattedValues = { ...formValues };
    if (formValues['pon type']) {
      formattedValues['pon_type'] = formValues['pon type'];
    }
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
        {inputs.map((input) => (
          <div key={input.title}>
            {input.type === 'checkbox' && input.options ? (
              input.options.map((option) => (
                <label key={option} className="inputCheckWrapper">  
                  {/* hacer que se vean en paralelo y no una abajo de la otra */}
                  <input
                    className="inputCheck"
                    type="checkbox"
                    name={option}
                    checked={formValues[input.title] === option}
                    onChange={(e) =>
                      setFormValues((prevValues) => ({
                        ...prevValues,
                        [input.title]: e.target.checked ? option : '',
                      }))
                    }
                  />
                  {option}
                </label>
              ))
            ) : (
              <div>
                <label className="label">{input.title}:</label>
                <input
                  className="input"
                  type={input.type || 'text'}
                  name={input.title}
                  value={formValues[input.title] || ''}
                  onChange={(e) =>
                    setFormValues((prevValues) => ({
                      ...prevValues,
                      [input.title]: e.target.value,
                    }))
                  }
                  required
                />
              </div>
            )}
          </div>
        ))}
        <button type="submit">Add</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default Formulario;
