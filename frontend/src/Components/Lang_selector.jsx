import React, { useState, useEffect, useRef } from 'react';
import { LANGUAGE_VER } from './Constants.js';

const languages = Object.entries(LANGUAGE_VER);
const ACTIVE_COLOR = "text-blue-400";

const Lang_selector = ({ language, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (lang) => {
    onSelect(lang);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center flex-wrap space-x-2" ref={dropdownRef}>
      <label className="mb-2 text-lg">Language:</label>
      <div className="relative">
        <button
          className={`border-2 border-slategray mb-1 px-4 py-1 rounded-lg ${isOpen ? 'border-blue-400' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {language}
        </button>
        {isOpen && (
          <ul className="absolute top-full left-0 z-50 bg-gray-900 text-white list-none p-0 m-0 border border-gray-700 rounded-md mt-1">
            {languages.map(([lang, version]) => (
              <li
                key={lang}
                className={`px-4 py-2 cursor-pointer flex justify-between items-center ${lang === language ? ACTIVE_COLOR : ''} hover:bg-gray-700`}
                onClick={() => handleSelect(lang)}
              >
                {lang} <span className="text-sm ml-2">{version}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Lang_selector;
