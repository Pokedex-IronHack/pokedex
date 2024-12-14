import { useState, useEffect } from "react"; 
import { api } from "../../utils/api.js"; 
import Pills from "../pills/pills.jsx";
import "./pokemon-detail.css";

function PokemonDetail({ id }) { 
    const [loading, setLoading] = useState(true); 
    const [pokemon, setPokemon] = useState(null);
    const [weaknesses, setWeaknesses] = useState([]); // Store weaknesses

    useEffect(() => {
        setLoading(true); 
        
        api.get(`/pokemon/${id}`)
            .then(async (response) => {
                const pokemonData = response.data;
                setPokemon(pokemonData);
                
                // Fetch weaknesses
                const allWeaknesses = [];
                for (let type of pokemonData.types) {
                    const typeResponse = await api.get(`/type/${type.type.name}`);
                    const doubleDamageTypes = typeResponse.data.damage_relations.double_damage_from;
                    allWeaknesses.push(...doubleDamageTypes.map(weakness => weakness.name));
                }

                // Remove duplicates
                setWeaknesses([...new Set(allWeaknesses)]);
                setLoading(false); 
            })
            .catch((error) => {
                console.log("Error fetching Pokémon:", error);
                setLoading(false); 
            });
    }, [id]); 

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

    return (
        <div className="pokemon-detail">
            <h1>{capitalizeName(pokemon.name)}</h1>
            <p>Nº {formatId(pokemon.id)}</p>
            <div className="body">
                <div className="types-weaknesses">
                    <h3 className="Types">Type</h3>
                    <ul>
                        {pokemon.types.map((typeInfo, index) => (
                            <Pills key={index} type={typeInfo.type.name} />
                        ))}
                    </ul>

                    <h3 className="Weakness">Weakness</h3>
                    <ul>
                        {weaknesses.map((weakness, index) => (
                            <Pills key={index} type={weakness} />
                        ))}
                    </ul>
                </div>

                <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                    className="card-img-top"
                    alt={pokemon.name}
                    style={{ width: '400px', height: 'auto' }}
                />
                <div className="info">
                    <h4>Height:</h4> <p>{(pokemon.height * 0.1).toFixed(2)} m </p>
                    <h4>Weight:</h4> <p>{(pokemon.weight * 0.1).toFixed(2)} kg</p>
                    <h4>Abilities:</h4><p>
                        <ul>
                            {pokemon.abilities.map((abilityInfo, index) => (
                                <li key={index}>{abilityInfo.ability.name}</li>
                            ))}
                        </ul>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PokemonDetail;
