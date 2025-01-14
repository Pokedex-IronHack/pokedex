import { useState, useEffect } from "react";
import { api } from "../../utils/api";
import PokemonCard from "../pokemon-card/pokemon-card";
import { useFavorites } from "../../context/FavoritesContext";

function FavoritesList({ className = "", showWarning, setShowWarning }) {
  const [favoritePokemons, setFavoritePokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { favorites } = useFavorites();

  useEffect(() => {
    const fetchFavoritePokemons = async () => {
      setLoading(true);
      setError(null);

      try {
        const detailedFavorites = await Promise.all(
          favorites.map(async (id) => {
            try {
              const response = await api.get(`/pokemon/${id}`);
              return response.data;
            } catch (error) {
              console.error(`Error fetching details for Pokemon ID ${id}:`, error);
              return null;
            }
          })
        );

        // Filtra los favoritos válidos (que no sean null)
        setFavoritePokemons(detailedFavorites.filter((pokemon) => pokemon !== null));
      } catch (error) {
        setError("Error loading favorite Pokémon.");
      } finally {
        setLoading(false);
      }
    };

    if (favorites.length > 0) {
      fetchFavoritePokemons();
    } else {
      setFavoritePokemons([]);
      setLoading(false);
    }
  }, [favorites]);

  if (loading) {
    return (
      <div className="loading-container-fav">
        <img
          src="../../../public/loading-favs.gif"
          alt="Loading..."
          className="loading-favs"
        />
      </div>
    );
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="favorites-container">
      <h1 className="favs-titol">Your favorites</h1>
      <div className={`d-flex flex-wrap gap-3 ${className}`}>
        {favoritePokemons.length > 0 ? (
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
