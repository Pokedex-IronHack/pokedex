import "./pokemon-card.css"
import Pills from "../pills/pills";

function PokemonCard ({pokemon}){
    function formatId(id){
        let formattedId;
        if (id.toString().length === 1){
            formattedId = `00${id}`
        }
        else if (id.toString().length === 2){
            formattedId = `0${id}`}
        else ( formattedId = `${id}`)
        return formattedId
    }

    function capitalizeName (name){
        let capitalized; 
        capitalized = name[0].toUpperCase() + name.slice(1).toLowerCase(); 
        return capitalized; 
    }

    return (
        <div className="pokemon-card">
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} className="card-img-top" alt={pokemon.name} style={{ width: '200px', height: '200px' }} />
            <div className="card-body">
                <h3 className= "fs-6 text-secondary"> Nº {formatId(pokemon.id)} </h3>
                <h4 className="card-title mb-1 text-break"> {capitalizeName(pokemon.name)} </h4>
                <div className="types">
                    {pokemon.types.map((typeInfo, index) => (
                    <Pills key={index} type={typeInfo.type.name} />
                    ))}
                </div>
            </div>
        </div>
    )

}; 

export default PokemonCard; 