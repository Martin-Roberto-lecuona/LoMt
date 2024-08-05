import React from 'react';
import '../styles/DropDown.css'
interface DropdownProps {
  name: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ name, options, onChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    onChange(value);
  };

  return (
    <div className='wrapper'>
      {name}
      <select name={name} onChange={handleInputChange}>
        <option value="None">-</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
