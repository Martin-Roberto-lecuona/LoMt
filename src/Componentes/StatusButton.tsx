import React from 'react';
import '../styles/StatusButton.css';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Clients from '../Pantallas/Clients';

interface StatusButtonProps {
  color: string;
  icon: string;
  title: string;
  count: number;
  details: string[];
  route?:string;
}

const StatusButton: React.FC<StatusButtonProps> = ({ color, icon, title, count, details, route }) => {
  const navigate = useNavigate();

  const gotoRoute = (where: string | undefined) => {
    if (where) {
      navigate(`clients/${where}`);
    }
    else{
      navigate('/clients');
    }
  }

  return (
    <div className="statusButton" onClick={() => gotoRoute(route)} style={{ backgroundColor: color }}>
      <div className="statusButton-title">{title}</div>
      <div className="statusButton-icon">{icon}</div>
      <div className="statusButton-count">{count}</div>
      <div className="statusButton-details" >
        {details.map((detail, index) => (
          <div key={index}>{detail}&emsp;</div>
        ))}
      </div>
    </div>
  );
};

export default StatusButton;
