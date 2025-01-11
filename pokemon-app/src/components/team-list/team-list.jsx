import { useState, useEffect } from "react";
import { api } from "../../utils/api";
import BubbleCard from "../bubble-card/bubble-card";
import { useTeam } from "../../context/TeamContext";

function TeamList({ className = "" }) {
  const [pokemons, setPokemons] = useState([]);
  const [loadingTeam, setLoadingTeam] = useState(true);  
  const { team } = useTeam();

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        let pokemonData = [];
        let offset = 0;
        const limit = 100;
        let fetching = true;

        // Ajustamos la lógica de la paginación para obtener más de 151 Pokémon
        while (fetching) {
          const response = await api.get(`/pokemon?limit=${limit}&offset=${offset}`);
          pokemonData = pokemonData.concat(response.data.results);

          if (response.data.results.length < limit) {
            fetching = false;
          } else {
            offset += limit;
          }
        }

        // Obtener los detalles de los Pokémon recuperados
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

        setPokemons(detailedPokemons.filter(Boolean));  
        setLoadingTeam(false);  
      } catch (error) {
        console.error("Error fetching Pokémon list:", error);
        setLoadingTeam(false);  
      }
    };

    fetchPokemons();
  }, []);

  const yourTeam = pokemons.filter((pokemon) =>
    team.includes(pokemon.id)
  );

  return (
    <div>
      <h1 className="titol"> Your team </h1>
      <div className={`d-flex flex-wrap gap-3 ${className}`}>
        {loadingTeam ? (  
          <div>Loading your team...</div>
        ) : yourTeam.length > 0 ? (
          yourTeam.map((pokemon) => (
            <BubbleCard key={pokemon.id} pokemon={pokemon} />
          ))
        ) : (
          <p>No Pokémon selected for your team</p>
        )}
      </div>
    </div>
  );
}

export default TeamList;
