"use client";

import React from 'react';

// Define available languages (could be passed as prop or imported)
const LANGUAGES = ['pseudocode', 'javascript', 'python', 'java', 'c', 'c++'];

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLanguage, onLanguageChange }) => {
  
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onLanguageChange(event.target.value);
  };

  return (
    <div className="fixed top-4 right-4 z-40"> {/* Position top right */}
      <div className="bg-white/30 dark:bg-black/30 backdrop-blur-md border border-white/20 dark:border-black/20 rounded-lg shadow-lg p-2">
        <label htmlFor="global-lang-select" className="sr-only">Select Code Language</label>
        <select
          id="global-lang-select"
          value={selectedLanguage}
          onChange={handleSelectChange}
          className="block w-full p-1.5 border-none rounded-md text-sm bg-transparent text-white focus:outline-none focus:ring-0 appearance-none pr-8"
          // Style the dropdown arrow if needed, often tricky without custom components/libs
          style={{ 
              backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="%23ffffff" viewBox="0 0 24 24" width="24" height="24"><path d="M7 10l5 5 5-5z"/></svg>')`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.5rem center',
              backgroundSize: '1em',
          }}
          aria-label="Select code language example"
        >
          {LANGUAGES.map(lang => (
            <option key={lang} value={lang} className="text-black bg-white dark:text-white dark:bg-black">
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default LanguageSelector; 