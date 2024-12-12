
function PokemonCard ({pokemon}){

    return (
        <div className="pokemon-card">
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} className="card-img-top" alt={pokemon.name} />
            <div className="card-body">
                <h4 className="card-title mb-1 fw-light text-break">{pokemon.name} </h4>
                <h3 className= "text-lg font-semibold text-gray-800"> {pokemon.id} </h3>
            </div>
        </div>
    )

}; 

export default PokemonCard; 