import { useState, useEffect } from "react";
import { api } from "../../utils/api";
import PokemonCard from "../pokemon-card/pokemon-card";
import SearchBar from "../search-bar/search-bar";
import "../pokemon-list/pokemon-list.css";

function PokemonList({ className = "" }) {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [hasFilter, setHasFilter] = useState(false);
  const [isAscending, setIsAscending] = useState(true);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);

  const types = [
    "normal", "fire", "water", "electric", "grass",
    "ice", "fighting", "poison", "ground", "flying",
    "psychic", "bug", "rock", "ghost", "dragon",
    "dark", "steel", "fairy"
  ];

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await api.get("/pokemon?limit=151");
        const basicPokemons = response.data.results;

        const detailedPokemons = await Promise.all(
          basicPokemons.map(async (pokemon) => {
            try {
              const details = await api.get(`/pokemon/${pokemon.name}`);
              return details.data;
            } catch (error) {
              console.error(`Error fetching details for ${pokemon.name}:`, error);
              return null;
            }
          })
        );

        setPokemons(detailedPokemons.filter(Boolean));
      } catch (error) {
        console.error("Error fetching Pokémon list:", error);
      }
    };

    fetchPokemons();
  }, []);

  if (pokemons.length === 0) {
    return <div>Loading Pokémon...</div>;
  }

  // Filtrado por búsqueda
  const handleSearch = (query) => {
    if (query.length >= 2) {
      const filteredBySearch = typeFilteredPokemons.filter(pokemon =>
        pokemon.name.toLowerCase().startsWith(query.toLowerCase())
      );
      setFilteredPokemons(filteredBySearch);
      setHasFilter(query.trim() !== "");
    } else {
      setFilteredPokemons([]);
      setHasFilter(false);
    }
  };

  // Alternar el orden de los Pokémon
  const toggleOrder = () => {
    setIsAscending(!isAscending);
  };

  const sortPokemon = (pokemons) => {
    return [...pokemons].sort((a, b) =>
      isAscending ? a.id - b.id : b.id - a.id
    );
  };

  // Mostrar u ocultar el dropdown de tipos
  const toggleTypeDropdown = () => {
    setShowTypeDropdown((prev) => !prev);
  };

  // Manejar la selección de tipo
  const handleTypeToggle = (type) => {
    setSelectedTypes((prevSelectedTypes) =>
      prevSelectedTypes.includes(type)
        ? prevSelectedTypes.filter((t) => t !== type)
        : [...prevSelectedTypes, type]
    );
  };

  const typeFilteredPokemons = pokemons.filter((pokemon) =>
    selectedTypes.every((selectedType) =>
      pokemon.types.some((t) => t.type.name === selectedType)
    )
  );

  const displayedPokemons = sortPokemon(
    hasFilter
      ? filteredPokemons.filter(pokemon =>
          selectedTypes.every(type => pokemon.types.some(t => t.type.name === type))
        )
      : typeFilteredPokemons
  );

  return (
    <div>
      <h1>Pokémon List</h1>
      <SearchBar onSearch={handleSearch} className="search-bar-container" />

      <div className="d-inline-flex gap-2 my-3">
        <button
          type="button"
          className={`btn ${isAscending ? "active" : ""}`}
          onClick={toggleOrder}
          style={{ border: "none", boxShadow: "none" }}
        >
          {isAscending ? "Ascending" : "Descending"}{" "}
          <ion-icon
            name={isAscending ? "chevron-up-outline" : "chevron-down-outline"}
          ></ion-icon>
        </button>
      </div>

      <div className="type-filter">
        <button
          type="button"
          className="btn"
          onClick={toggleTypeDropdown}
        >
          Filter by Type
        </button>
        {showTypeDropdown && (
          <ul className="type-list">
            {types.map((type) => (
              <li
                key={type}
                className={`dropdown-item ${
                  selectedTypes.includes(type) ? "selected" : ""
                }`}
                onClick={() => handleTypeToggle(type)}
              >
                {type}
              </li>
            ))}
            <li className="dropdown-item clear-selection" onClick={() => setSelectedTypes([])}>
              Clear Selection
            </li>
          </ul>
        )}
      </div>

      <div className={`d-flex flex-wrap gap-3 ${className}`}>
        <div className="pokemon-list">
          {displayedPokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PokemonList;
