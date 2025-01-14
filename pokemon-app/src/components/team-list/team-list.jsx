import { useState, useEffect } from "react";
import { api } from "../../utils/api";
import BubbleCard from "../bubble-card/bubble-card";
import { useTeam } from "../../context/TeamContext";

function TeamList({ className = "" }) {
  const [teamPokemons, setTeamPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { team } = useTeam(); // Lista de IDs de Pokémon en el equipo

  useEffect(() => {
    const fetchTeamPokemons = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch detallado solo de los Pokémon del equipo
        const detailedTeam = await Promise.all(
          team.map(async (id) => {
            try {
              const response = await api.get(`/pokemon/${id}`);
              return response.data;
            } catch (error) {
              console.error(`Error fetching details for Pokemon ID ${id}:`, error);
              return null;
            }
          })
        );

        // Filtrar solo los datos válidos
        setTeamPokemons(detailedTeam.filter((pokemon) => pokemon !== null));
      } catch (error) {
        setError("Failed to load your team. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (team.length > 0) {
      fetchTeamPokemons();
    } else {
      setTeamPokemons([]);
      setLoading(false);
    }
  }, [team]);

  if (loading) {
    return (
      <div className="loading-container-team">
        <img
          src="../../../public/loading-team.gif"
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
    <div>
      <h1 className="favs-titol">Your team</h1>
      <div className={`d-flex flex-wrap gap-3 ${className}`}>
        {teamPokemons.length > 0 ? (
          teamPokemons.map((pokemon) => (
            <BubbleCard key={pokemon.id} pokemon={pokemon} />
          ))
        ) : (
          <p className="subtitol">No Pokémon selected for your team</p>
        )}
      </div>
    </div>
  );
}

export default TeamList;
