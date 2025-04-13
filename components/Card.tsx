import React from 'react';

interface CardProps {
  title: string;
  type: 'Data Structure' | 'Algorithm';
}

const Card: React.FC<CardProps> = ({ title, type }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer bg-card text-card-foreground">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-sm text-muted-foreground">{type}</p>
    </div>
  );
};

export default Card; 