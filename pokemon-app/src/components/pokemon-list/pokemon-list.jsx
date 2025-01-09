import { useState, useEffect } from "react";
import { api } from "../../utils/api";
import PokemonCard from "../pokemon-card/pokemon-card";
import SearchBar from "../search-bar/search-bar";

function PokemonList({ className = "" }) {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [hasFilter, setHasFilter] = useState(false);
  const [ isAscending, setIsAscending ] = useState (true); 

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
      isAscending 
        ? a.id - b.id 
        : b.id - a.id 
    )
  }

  const displayedPokemons = sortPokemon(hasFilter ? filteredPokemons : pokemons);

  return (
    <div>
      <h1>Pokémon List</h1>
      <SearchBar onSearch={handleSearch} className="search-bar-container"/>

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
