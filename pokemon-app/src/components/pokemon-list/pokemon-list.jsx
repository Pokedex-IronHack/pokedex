import { useState, useEffect } from "react";
import { api } from "../../utils/api";
import PokemonCard from "../pokemon-card/pokemon-card";
import SearchBar from "../search-bar/search-bar";

function PokemonList({ className = "" }) {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [hasSearchQuery, setHasSearchQuery] = useState(false);

  useEffect(() => {
    console.log("Reloading...");
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
  
  const handleSearch = (query) => {
    if (query.length >= 2) { 
      const filtered = pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().startsWith(query.toLowerCase())
      );
      setFilteredPokemons(filtered); 
      setHasSearchQuery(query.trim() !== "");
    } else {
      setFilteredPokemons([]); 
      setHasSearchQuery(false);
    }
  };

  const displayedPokemons = hasSearchQuery ? filteredPokemons : pokemons;

  return (
    <div>
      <h1>Pokémon List</h1>
      <SearchBar onSearch={handleSearch} className="search-bar-container"/>
      <div className={`d-flex flex-wrap gap-3 ${className}`}>

      <div className="pokemon-list">
          {displayedPokemons.map((pokemon) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
              ))
          }
        </div>

      </div>
    </div>
  );
}

export default PokemonList;
