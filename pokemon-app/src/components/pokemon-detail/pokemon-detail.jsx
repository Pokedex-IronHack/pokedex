import { useState, useEffect } from "react";
import { api } from "../../utils/api.js";
import Pills from "../pills/pills.jsx";
import "./pokemon-detail.css";
import BubbleCard from "../bubble-card/bubble-card.jsx";

function PokemonDetail({ id }) {
    const [currentId, setCurrentId] = useState(id);
    const [loading, setLoading] = useState(true);
    const [pokemon, setPokemon] = useState(null);
    const [weaknesses, setWeaknesses] = useState([]);
    const [nextPokemon, setNextPokemon] = useState(null);
    const [prevPokemon, setPrevPokemon] = useState(null);
    const [evolutionChain, setEvolutionChain] = useState(null);
    const [evolutionData, setEvolutionData] = useState([]);

    useEffect(() => {
        // Fetch current Pokémon data
        const fetchPokemonData = async () => {
            try {
                setLoading(true);

                // Fetch current Pokémon details
                const response = await api.get(`/pokemon/${currentId}`);
                const pokemonData = response.data;
                setPokemon(pokemonData);

                // Fetch weaknesses
                const allWeaknesses = [];
                for (let type of pokemonData.types) {
                    const typeResponse = await api.get(`/type/${type.type.name}`);
                    const doubleDamageTypes = typeResponse.data.damage_relations.double_damage_from;
                    allWeaknesses.push(...doubleDamageTypes.map((weakness) => weakness.name));
                }
                setWeaknesses([...new Set(allWeaknesses)]);

                // Fetch evolution chain
                const speciesData = await api.get(pokemonData.species.url);
                const evolutionChainUrl = speciesData.data.evolution_chain.url;
                const evolutionChainData = await api.get(evolutionChainUrl);
                const evolutionChain = getEvolutionChain(evolutionChainData.data);
                setEvolutionChain(evolutionChain);

                // Fetch evolution Pokémon details
                const evolutionPromises = evolutionChain.map((name) =>
                    api.get(`/pokemon/${name.toLowerCase()}`).then((res) => res.data)
                );
                const evolutionResults = await Promise.all(evolutionPromises);
                setEvolutionData(evolutionResults);

                setLoading(false);
            } catch (error) {
                console.log("Error fetching Pokémon data:", error);
                setLoading(false);
            }
        };

        fetchPokemonData();
    }, [currentId]);

    useEffect(() => {
        // Fetch next Pokémon
        const fetchNextPokemon = async () => {
            const nextId = Number(currentId) + 1;
            try {
                const response = await api.get(`/pokemon/${nextId}`);
                setNextPokemon(response.data);
            } catch {
                setNextPokemon(null);
            }
        };

        // Fetch previous Pokémon
        const fetchPrevPokemon = async () => {
            const prevId = Number(currentId) - 1;
            try {
                const response = await api.get(`/pokemon/${prevId}`);
                setPrevPokemon(response.data);
            } catch {
                setPrevPokemon(null);
            }
        };

        fetchNextPokemon();
        fetchPrevPokemon();
    }, [currentId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!pokemon) {
        return <div>No Pokémon found</div>;
    }

    // Helper functions
    function formatId(id) {
        return id.toString().padStart(3, "0");
    }

    function capitalizeName(name) {
        return name[0].toUpperCase() + name.slice(1).toLowerCase();
    }

    function getEvolutionChain(evolutionChain) {
        const result = [];
        function traverse(chain) {
            result.push(chain.species.name);
            chain.evolves_to.forEach((nextChain) => traverse(nextChain));
        }
        traverse(evolutionChain.chain);
        return result;
    }

    return (
        <div className="pokemon-details-container">
            <div className="pokemon-detail">
                {/* Navigation Buttons */}
                <div className="navigation-buttons">
                    {/* Previous Pokémon */}
                    <button
                        onClick={() => prevPokemon && setCurrentId(prevPokemon.id)}
                        disabled={!prevPokemon}
                    >
                        {prevPokemon ? capitalizeName(prevPokemon.name) : "N/A"}
                    </button>

                    {/* Current Pokémon */}
                    <h1>{capitalizeName(pokemon.name)}</h1>

                    {/* Next Pokémon */}
                    <button
                        onClick={() => nextPokemon && setCurrentId(nextPokemon.id)}
                        disabled={!nextPokemon}
                    >
                        {nextPokemon ? capitalizeName(nextPokemon.name) : "N/A"}
                    </button>
                </div>

                <p>Nº {formatId(pokemon.id)}</p>

                <div className="cards-container">
                    {/* Left Card: Info */}
                    <div className="info-card">
                        <h4>Height:</h4>
                        <p>{(pokemon.height * 0.1).toFixed(2)} m</p>
                        <h4>Weight:</h4>
                        <p>{(pokemon.weight * 0.1).toFixed(2)} kg</p>
                        <h4>Abilities:</h4>
                        <ul>
                            {pokemon.abilities.map((abilityInfo, index) => (
                                <li key={index}>{abilityInfo.ability.name}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Center Image */}
                    <div className="image-container">
                        <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                            alt={pokemon.name}
                        />
                    </div>

                    {/* Right Card: Types & Weaknesses */}
                    <div className="types-weakness-card">
                        <h4>Type</h4>
                        <ul>
                            {pokemon.types.map((typeInfo, index) => (
                                <Pills key={index} type={typeInfo.type.name} />
                            ))}
                        </ul>
                        <h4>Weakness</h4>
                        <ul>
                            {weaknesses.map((weakness, index) => (
                                <Pills key={index} type={weakness} />
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Evolution Chain */}
                <div className="evolution-chain">
                    {evolutionData.map((evolutionPokemon, index) => (
                        <BubbleCard
                            key={index}
                            pokemon={evolutionPokemon}
                            showRemoveIcon={false}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PokemonDetail;
