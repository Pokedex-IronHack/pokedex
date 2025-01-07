import { useState, useEffect } from "react";
import { api } from "../../utils/api";
import PokemonCard from "../pokemon-card/pokemon-card";

function PokemonList({ className = "" }) {
  const [pokemons, setPokemons] = useState([]);

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

  return (
    <div>
      <h1>Pokémon List</h1>
      <div className={`d-flex flex-wrap gap-3 ${className}`}>
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

export default PokemonList;
