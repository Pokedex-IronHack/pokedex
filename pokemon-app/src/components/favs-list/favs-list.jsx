import { useState, useEffect } from "react";
import { api } from "../../utils/api";
import PokemonCard from "../pokemon-card/pokemon-card";
import { useFavorites } from "../../context/FavoritesContext";

function FavoritesList({ className = "" }) {
  const [pokemons, setPokemons] = useState([]);
  const [loadingFavorites, setLoadingFavorites] = useState(true);  // Added loading state for favorites
  const { favorites } = useFavorites();

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

        setPokemons(detailedPokemons.filter(Boolean));  // Filter out failed fetches
        setLoadingFavorites(false);  // Set loading state to false after fetching
      } catch (error) {
        console.error("Error fetching Pokémon list:", error);
        setLoadingFavorites(false);  // Set loading state to false even in case of error
      }
    };

    fetchPokemons();
  }, []);

  if (pokemons.length === 0) {
    return <div>Loading Pokémon...</div>;
  }

  // Filter Pokémon that are in the favorites list
  const favoritePokemons = pokemons.filter((pokemon) =>
    favorites.includes(pokemon.id)
  );

  return (
    <div>
      <h1>Favorite Pokémon</h1>
      <div className={`d-flex flex-wrap gap-3 ${className}`}>
        {loadingFavorites ? (  // Show loading message while filtering favorites
          <div>Loading favorite Pokémon...</div>
        ) : favoritePokemons.length > 0 ? (
          favoritePokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))
        ) : (
          <p>No favorite Pokémon selected</p>
        )}
      </div>
    </div>
  );
}

export default FavoritesList;
