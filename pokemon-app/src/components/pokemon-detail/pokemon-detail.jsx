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
    const [prevPokemon, setPrevPokemon] = useState (null); 
    const [evolutionChain, setEvolutionChain] = useState(null);
    const [evolutionData, setEvolutionData] = useState([]);

    useEffect(() => {
        setLoading(true);

        api.get(`/pokemon/${currentId}`)
            .then(async (response) => {
                const pokemonData = response.data;
                setPokemon(pokemonData);

                const allWeaknesses = [];
                for (let type of pokemonData.types) {
                    const typeResponse = await api.get(`/type/${type.type.name}`);
                    const doubleDamageTypes = typeResponse.data.damage_relations.double_damage_from;
                    allWeaknesses.push(...doubleDamageTypes.map(weakness => weakness.name));
                }

                setWeaknesses([...new Set(allWeaknesses)]);

                const speciesData = await api.get(pokemonData.species.url);
                const evolutionChainUrl = speciesData.data.evolution_chain.url;
                const evolutionChainData = await api.get(evolutionChainUrl);
                const evolutionChain = getEvolutionChain(evolutionChainData.data);
                setEvolutionChain(evolutionChain);

                const evolutionPromises = evolutionChain.map((name) =>
                    api.get(`/pokemon/${name.toLowerCase()}`).then((res) => res.data)
                );
                const evolutionResults = await Promise.all(evolutionPromises);
                setEvolutionData(evolutionResults);
                console.log(evolutionResults);

                setLoading(false);
            })
            .catch((error) => {
                console.log("Error fetching Pokémon:", error);
                setLoading(false); 
            });
    }, [currentId]);

    useEffect(() => {
        if (currentId === null) return;

        const nextId = Number(currentId) + 1;
        api.get(`/pokemon/${nextId}`)
            .then((nextResponse) => {
                setNextPokemon(nextResponse.data);
            })
            .catch(() => {
                setNextPokemon(null); 
            });
    }, [currentId]);

    useEffect(() => {
        if (currentId === null) return;

        const prevId = Number(currentId) - 1;
        api.get(`/pokemon/${prevId}`)
            .then((prevResponse) => {
                setPrevPokemon(prevResponse.data);
            })
            .catch(() => {
                setPrevPokemon(null);
            });
    }, [currentId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!pokemon) {
        return <div>No Pokémon found</div>;
    }

    function formatId(id) {
        if (id.toString().length === 1) {
            return `00${id}`;
        } else if (id.toString().length === 2) {
            return `0${id}`;
        } else {
            return `${id}`;
        }
    }

    function capitalizeName(name) {
        return name[0].toUpperCase() + name.slice(1).toLowerCase();
    }

    function getEvolutionChain(evolutionChain) {
        const result = []; 
        
        function traverse(chain) {
            result.push(chain.species.name);
            chain.evolves_to.forEach(nextChain => traverse(nextChain));
        }

        traverse(evolutionChain.chain);

        return result;
    }

    return (
        <div className="pokemon-detail">
            <div className="buttons">
                <button
                    type="button"
                    className={`prev-button ${currentId > 1 ? "visible" : ""}`}
                    onClick={() => setCurrentId((prevId) => Number(prevId) - 1)}
                >
                    {prevPokemon ? (
                        <>
                            {capitalizeName(prevPokemon.name)} - Nº {formatId(prevPokemon.id)}
                        </>
                    ) : (
                        "Previous Pokémon unavailable"
                    )}
                </button>

                {currentId < 151 && (
                    <button
                        type="button"
                        className="next-button"
                        onClick={() => setCurrentId((prevId) => Number(prevId) + 1)}
                    >
                        {nextPokemon ? (
                            <>
                                {capitalizeName(nextPokemon.name)} - Nº {formatId(nextPokemon.id)}
                            </>
                        ) : (
                            "Next Pokémon unavailable"
                        )}
                    </button>
                )}
            </div>
            <h1>{capitalizeName(pokemon.name)}</h1>
            <p>Nº {formatId(pokemon.id)}</p>
            <div className="body">
                <div className="types-weaknesses">
                    <div className="types-container">
                        <h4 className="types">Type</h4>
                        <ul>
                            {pokemon.types.map((typeInfo, index) => (
                                <Pills key={index} type={typeInfo.type.name} />
                            ))}
                        </ul>
                    </div>

                    <div className="weakness-container">
                        <h4 className="weakness">Weakness</h4>
                        <ul>
                            {weaknesses.map((weakness, index) => (
                                <Pills key={index} type={weakness} />
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="image">
                    <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                        className="card-img-top"
                        alt={pokemon.name}
                        style={{ width: '300px', height: 'auto' }}
                    />
                </div>
                <div className="info">
                    <h4>Height:</h4> <p>{(pokemon.height * 0.1).toFixed(2)} m </p>
                    <h4>Weight:</h4> <p>{(pokemon.weight * 0.1).toFixed(2)} kg</p>
                    <h4>Abilities:</h4>
                    <ul>
                        {pokemon.abilities.map((abilityInfo, index) => (
                            <li key={index}>{abilityInfo.ability.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="evolution-chain">
                {evolutionData.map((pokemon, index) => (
                    <BubbleCard key={index} pokemon={pokemon} showRemoveIcon={false} />
                ))}
            </div>
        </div>
    );
}

export default PokemonDetail;
