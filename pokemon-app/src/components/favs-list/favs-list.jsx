import { useState, useEffect } from "react";
import { api } from "../../utils/api";
import PokemonCard from "../pokemon-card/pokemon-card";
import { useFavorites } from "../../context/FavoritesContext";

function FavoritesList({ className = "", showWarning, setShowWarning }) {
  const [favoritePokemons, setFavoritePokemons] = useState([]);
  const [loadingFavorites, setLoadingFavorites] = useState(true);
  const { favorites } = useFavorites();

  useEffect(() => {
    const fetchFavoriteDetails = async () => {
      if (!favorites.length) {
        setLoadingFavorites(false);
        return;
      }

      try {
        // Solo obtener detalles de los Pokémon en la lista de favoritos
        const detailedPokemons = await Promise.all(
          favorites.map(async (id) => {
            try {
              const response = await api.get(`/pokemon/${id}`);
              return response.data;
            } catch (error) {
              console.error(`Error fetching details for Pokémon ID ${id}:`, error);
              return null;
            }
          })
        );

        // Filtrar los que se obtuvieron correctamente
        setFavoritePokemons(detailedPokemons.filter((pokemon) => pokemon != null));
        setLoadingFavorites(false);
      } catch (error) {
        console.error("Error fetching favorite Pokémon details:", error);
        setLoadingFavorites(false);
      }
    };

    fetchFavoriteDetails();
  }, [favorites]);

  return (
    <div className="favorites-container">
      <h1 className="favs-titol">Your favorites</h1>
      <div className={`d-flex flex-wrap gap-3 ${className}`}>
        {loadingFavorites ? (
          <div className="loading-container-fav">
            <img src="/loading-favs.gif" alt="Loading..." className="loading-favs" />
          </div>
        ) : favoritePokemons.length > 0 ? (
          favoritePokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              showRemoveIcon={true}
              showWarning={showWarning}
              setShowWarning={setShowWarning}
            />
          ))
        ) : (
          <p className="subtitol">No favorite Pokémon selected</p>
        )}
      </div>
    </div>
  );
}

export default FavoritesList;
