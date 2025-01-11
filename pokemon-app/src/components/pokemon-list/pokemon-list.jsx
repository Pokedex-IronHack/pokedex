import { useState, useEffect } from "react";
import { api } from "../../utils/api";
import PokemonCard from "../pokemon-card/pokemon-card";
import SearchBar from "../search-bar/search-bar";
import "../pokemon-list/pokemon-list.css";

const LIMIT = 1025;

function PokemonList({ className = "" }) {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [hasFilter, setHasFilter] = useState(false);
  const [isAscending, setIsAscending] = useState(true);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedGeneration, setSelectedGeneration] = useState(0); // 0 representará "All"
  const types = [
    "normal", "fire", "water", "electric", "grass",
    "ice", "fighting", "poison", "ground", "flying",
    "psychic", "bug", "rock", "ghost", "dragon",
    "dark", "steel", "fairy"
  ];

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        let pokemonData = [];

        if (selectedGeneration === 0) {
          // Fetch all Pokémon within the predefined limit
          const response = await api.get(`/pokemon?limit=${LIMIT}`);
          pokemonData = response.data.results;
        } else {
          // Fetch Pokémon for the selected generation
          const response = await api.get(`/generation/${selectedGeneration}`);
          pokemonData = response.data.pokemon_species;
        }

        // Fetch detailed Pokémon data
        const detailedPokemons = await Promise.all(
          pokemonData.map(async (pokemon) => {
            try {
              const details = await api.get(`/pokemon/${pokemon.name}`);
              return details.data;
            } catch (error) {
              console.error(`Error fetching details for ${pokemon.name}:`, error);
              return null;
            }
          })
        );

        // Set valid Pokémon data
        setPokemons(detailedPokemons.filter(pokemon => pokemon != null));
        setFilteredPokemons(detailedPokemons.filter(pokemon => pokemon != null));
      } catch (error) {
        console.error("Error fetching Pokémon list:", error);
      }
    };

    fetchPokemons();
  }, [selectedGeneration]);

  const handleSearch = (query) => {
    if (query.length >= 2) {
      const filteredBySearch = typeFilteredPokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().startsWith(query.toLowerCase())
      );
      setFilteredPokemons(filteredBySearch);
      setHasFilter(query.trim() !== "");
    } else {
      setFilteredPokemons([]);
      setHasFilter(false);
    }
  };

  const toggleOrder = () => {
    setIsAscending(!isAscending);
  };

  const sortPokemon = (pokemons) => {
    return [...pokemons].sort((a, b) =>
      isAscending ? a.id - b.id : b.id - a.id
    );
  };

  const toggleTypeDropdown = () => {
    setShowTypeDropdown((prev) => !prev);
  };

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
      ? filteredPokemons.filter((pokemon) =>
          selectedTypes.every((type) =>
            pokemon.types.some((t) => t.type.name === type)
          )
        )
      : typeFilteredPokemons
  );

  return (
    <div>
      <SearchBar onSearch={handleSearch} className="search-bar-container" />

      <div className="horizontal-filters">
        <div className="order-button">
          <button
            type="button"
            className={`btn ${isAscending ? "active" : ""}`}
            onClick={toggleOrder}
            style={{ border: "none", boxShadow: "none" }}
          >
            {isAscending ? "Ascending" : "Descending"}{" "}
            <div className="icon">
              <ion-icon
                name={isAscending ? "chevron-up-outline" : "chevron-down-outline"}
              ></ion-icon>
            </div>
          </button>
        </div>

        <select
          value={selectedGeneration}
          onChange={(e) => setSelectedGeneration(Number(e.target.value))}
          className="generation-select"
        >
          <option value={0}>All Generations</option>
          <option value={1}>Generation 1</option>
          <option value={2}>Generation 2</option>
          <option value={3}>Generation 3</option>
          <option value={4}>Generation 4</option>
          <option value={5}>Generation 5</option>
          <option value={6}>Generation 6</option>
          <option value={7}>Generation 7</option>
          <option value={8}>Generation 8</option>
        </select>

        <button
          className="btn"
          onClick={toggleTypeDropdown}
        >
          Filter by Type
        </button>
      </div>

      {showTypeDropdown && (
        <ul className="type-list">
          {types.map((type) => (
            <li
              key={type}
              className={`dropdown-item ${type} ${
                selectedTypes.includes(type) ? "selected" : ""
              }`}
              onClick={() => handleTypeToggle(type)}
            >
              {type}
            </li>
          ))}
        </ul>
      )}

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
