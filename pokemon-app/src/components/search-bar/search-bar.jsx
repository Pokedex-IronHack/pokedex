import React, { useState } from 'react';
import './search-bar.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value);  // Llamamos a la función pasada como prop
  };

  return (
    <div className="searchBar">
      <div className="inputWrapper">
        <input
          type="text"
          placeholder="Search your Pokémon"
          value={query}
          onChange={handleChange}
          className="searchInput"
        />
        <img 
          src="../../../public/searchicon.svg"  // Ruta de la imagen
          alt="Search"
          className="searchIcon"
        />
      </div>
    </div>
  );
};

export default SearchBar;
