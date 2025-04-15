"use client";

import React from 'react';

// Removed LANGUAGES constant

interface CardProps {
  title: string;
  type: 'Data Structure' | 'Algorithm';
  codeExamples: { [key: string]: string; }; // Keep this for potential future use or context
  onClick: () => void; 
  // Removed selectedLanguage and onLanguageChange props
}

const Card: React.FC<CardProps> = ({ 
  title, 
  type, 
  onClick, 
  // Removed props from destructuring
}) => {

  // Removed handlers: handleSelectChange, handleSelectClick

  return (
    <div 
      className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer bg-card text-card-foreground h-36 flex flex-col justify-between" // Reverted height
      onClick={onClick} 
      role="button"
      tabIndex={0}
      aria-label={`View details for ${title}`} // Reverted aria-label
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
    >
      <div> 
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-sm text-muted-foreground">{type}</p> 
      </div>
      
      {/* Removed Language Selector div */}
    </div>
  );
};

export default Card; 