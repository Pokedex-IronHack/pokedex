import "./pokemon-card.css"

function PokemonCard ({pokemon}){
    function formatId(id){
        let formattedId;
        if (id.toString().length === 1){
            formattedId = `00${pokemon.id}`
        }
        else if (id.toString().length === 2){
            formattedId = `0${pokemon.id}`}
        else ( formattedId = `${pokemon.id}`)
        return formattedId
    }
   
    return (
        <div className="pokemon-card">
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} className="card-img-top" alt={pokemon.name} style={{ width: '200px', height: '200px' }} />
            <div className="card-body">
                <h3 className= "fs-6 text-secondary"> Nº {formatId(pokemon.id)} </h3>
                <h4 className="card-title mb-1 text-break">{pokemon.name} </h4>
                
            </div>
        </div>
    )

}; 

export default PokemonCard; 