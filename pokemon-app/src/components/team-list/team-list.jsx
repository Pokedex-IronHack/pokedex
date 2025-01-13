import { useState, useEffect } from "react";
import { api } from "../../utils/api";
import BubbleCard from "../bubble-card/bubble-card";
import { useTeam } from "../../context/TeamContext";

function TeamList({ className = "" }) {
  const [teamPokemons, setTeamPokemons] = useState([]);
  const [loadingTeam, setLoadingTeam] = useState(true);
  const { team } = useTeam(); // Lista de IDs o nombres de los Pokémon en el equipo

  useEffect(() => {
    const fetchTeamDetails = async () => {
      if (!team.length) {
        setLoadingTeam(false);
        return;
      }

      try {
        const detailedPokemons = await Promise.all(
          team.map(async (id) => {
            try {
              const response = await api.get(`/pokemon/${id}`);
              return response.data;
            } catch (error) {
              console.error(`Error fetching details for Pokémon ID ${id}:`, error);
              return null;
            }
          })
        );

        // Filtrar Pokémon válidos y establecer el estado
        setTeamPokemons(detailedPokemons.filter((pokemon) => pokemon != null));
        setLoadingTeam(false);
      } catch (error) {
        console.error("Error fetching team Pokémon details:", error);
        setLoadingTeam(false);
      }
    };

    fetchTeamDetails();
  }, [team]);

  return (
    <div>
      <h1 className="favs-titol">Your team</h1>
      <div className={`d-flex flex-wrap gap-3 ${className}`}>
        {loadingTeam ? (
          <div className="loading-container-team">
            <img
              src="/loading-team.gif"
              alt="Loading..."
              className="loading-team"
            />
          </div>
        ) : teamPokemons.length > 0 ? (
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
