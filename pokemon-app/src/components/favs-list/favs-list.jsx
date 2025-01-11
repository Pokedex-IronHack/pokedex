import { useState, useEffect } from "react";
import { api } from "../../utils/api";
import PokemonCard from "../pokemon-card/pokemon-card";
import { useFavorites } from "../../context/FavoritesContext";

function FavoritesList({ className = "" }) {
  const [pokemons, setPokemons] = useState([]);
  const [loadingFavorites, setLoadingFavorites] = useState(true);
  const { favorites } = useFavorites();

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        let pokemonData = [];
        let offset = 0;
        const limit = 1025;
        let fetching = true;
        
        // Ciclo para traer todos los Pokémon de todas las generaciones, sin filtros
        while (fetching) {
          const response = await api.get(`/pokemon?limit=${limit}&offset=${offset}`);
          pokemonData = pokemonData.concat(response.data.results);

          if (response.data.results.length < limit) {
            fetching = false;
          } else {
            offset += limit;
          }
        }

        // Recuperamos los detalles de cada Pokémon
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

        setPokemons(detailedPokemons.filter(Boolean)); // Filtramos los Pokémon inválidos o nulos
        setLoadingFavorites(false);
      } catch (error) {
        console.error("Error fetching Pokémon list:", error);
        setLoadingFavorites(false);
      }
    };

    fetchPokemons();
  }, []);

  // Si no hay Pokémon cargados
  if (pokemons.length === 0) {
    return <div>Loading your favorite Pokémon...</div>;
  }

  // Filtrar los Pokémon que están en favoritos
  const favoritePokemons = pokemons.filter((pokemon) =>
    favorites.includes(pokemon.id)
  );

  return (
    <div className="favorites-container">
      <h1 className="titol">Your favorites</h1>
      <div className={`d-flex flex-wrap gap-3 ${className}`}>
        {loadingFavorites ? (
          <div>Loading favorite Pokémon...</div>
        ) : favoritePokemons.length > 0 ? (
          favoritePokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              showRemoveIcon={true}
            />
          ))
        ) : (
          <p>No favorite Pokémon selected</p>
        )}
      </div>
    </div>
  );
}

export default FavoritesList;
