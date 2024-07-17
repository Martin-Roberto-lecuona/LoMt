import React from 'react';
import '../styles/StatusButton.css';

interface StatusButtonProps {
  color: string;
  icon: string;
  title: string;
  count: number;
  details: string[];
}

const StatusButton: React.FC<StatusButtonProps> = ({ color, icon, title, count, details }) => {
  return (
    <div className="statusButton" style={{ backgroundColor: color }}>
      <div className="statusButton-title">{title}</div>
      <div className="statusButton-icon">{icon}</div>
      <div className="statusButton-count">{count}</div>
      <div className="statusButton-details">
        {details.map((detail, index) => (
          <div key={index}>{detail}&emsp;</div>
        ))}
      </div>
    </div>
  );
};

export default StatusButton;
