import { useState, useEffect } from "react";
import { api } from "../../utils/api";
import BubbleCard from "../bubble-card/bubble-card";
import { useTeam } from "../../context/TeamContext";

const LIMIT = 1025;

function TeamList({ className = ""}) {
  const [pokemons, setPokemons] = useState([]);
  const [loadingTeam, setLoadingTeam] = useState(true);   
  const { team } = useTeam();

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        let pokemonData = [];

        const response = await api.get(`/pokemon?limit=${LIMIT}`);
        pokemonData = pokemonData.concat(response.data.results);

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

        setPokemons(detailedPokemons.filter(pokemon => pokemon != null ));  
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
      <h1 className="favs-titol">Your team</h1>
      <div className={`d-flex flex-wrap gap-3 ${className}`}>
        {loadingTeam ? (  
          <div className="loading-container-team">
            <img src="../../../public/loading-team.gif" alt="Loading..." className="loading-favs" />
          </div>
        ) : yourTeam.length > 0 ? (
          yourTeam.map((pokemon) => (
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