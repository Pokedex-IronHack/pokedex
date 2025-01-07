import "./pokemon-card.css"; 
import { Link } from "react-router-dom";
import Pills from "../pills/pills";
import { useFavorites } from "../../context/FavoritesContext";

function PokemonCard ({pokemon}) {
    function formatId(id) {
        let formattedId;
        if (id.toString().length === 1) {
            formattedId = `00${id}`;
        } else if (id.toString().length === 2) {
            formattedId = `0${id}`;
        } else {
            formattedId = `${id}`;
        }
        return formattedId;
    }

    const {favorites, setFavorites} = useFavorites(); 

    function toggleFavorites (item) {
        setFavorites((prev)=> 
        prev.includes(item)
            ? prev.filter((fav)=> fav !== item)
        : [...prev, item]); 
    }

    function capitalizeName(name) {
        return name[0].toUpperCase() + name.slice(1).toLowerCase();
    }
    
    const isFavorite = favorites.includes(pokemon.id);

    return (
        <div className="pokemon-card">
            
            <Link to={`/pokedex/${pokemon.id}`} className="card-link">
                <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                    className="card-img-top"
                    alt={pokemon.name}
                    style={{ width: '200px', height: '200px' }}
                />
                <div className="card-body">
                    <div className="favorite" onClick={() => toggleFavorites(pokemon.id)}>
                      <i className={`fa ${isFavorite ? 'fa-heart' : 'fa-heart-o'}`} 
                         aria-hidden="true" 
                         style={{ color: isFavorite ? 'lightcoral' : 'black' }}></i>
                    </div>

                    <h3 className="fs-6 text-secondary"> Nº {formatId(pokemon.id)} </h3>
                    <h4 className="card-title mb-1 text-break"> {capitalizeName(pokemon.name)} </h4>
                    <div className="types">
                        {pokemon.types.map((typeInfo, index) => (
                            <Pills key={index} type={typeInfo.type.name} />
                        ))}
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default PokemonCard;
 