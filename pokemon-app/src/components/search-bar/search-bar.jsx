import React, { useState } from 'react';
import './search-bar.css';

const SearchBar = ({ onSearch, className }) => {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className={`searchBar ${className}`}>
      <div className="inputWrapper">
        <input
          type="text"
          placeholder="Search your Pokémon"
          value={query}
          onChange={handleChange}
          className="searchInput"
        />
        <img
          src="/public/searchicon.svg" 
          alt="Search"
          className="searchIcon"
        />
      </div>
    </div>
  );
};

export default SearchBar;
