import "./pokemon-card.css"; 
import { Link } from "react-router-dom";
import Pills from "../pills/pills";
import { useFavorites } from "../../context/FavoritesContext";
import { useTeam } from "../../context/TeamContext";


function PokemonCard({ pokemon, showWarning, setShowWarning }) {
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

    const { favorites, setFavorites } = useFavorites(); 
    const { team, setTeam } = useTeam(); 

    function toggleFavorites(item) {
        setFavorites((prev) => 
            prev.includes(item)
                ? prev.filter((fav) => fav !== item)
                : [...prev, item]
        ); 
    }

    function toggleTeam(item) {
        setTeam((prev) =>
          prev.includes(item)
            ? prev.filter((team) => team !== item)
            : [...prev, item]
        );
    }

    function formatName(name) {
        return name
        .split('-')
        .map(word => word[0].toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    }
    
    const isFavorite = favorites.includes(pokemon.id);
    const isTeam = team.includes(pokemon.id); 

    function handleFavoriteClick(e) { 
        e.stopPropagation(); 
        toggleFavorites(pokemon.id);
    } 

    function handleTeamClick(e) {
        e.stopPropagation();
        
        if (team.length >= 6 && !isTeam) {
            setShowWarning(true);
        } else {
            setShowWarning(false); 
            setTeam((prev) =>
                prev.includes(pokemon.id)
                    ? prev.filter((team) => team !== pokemon.id)
                    : [...prev, pokemon.id]
            );
        }
    }
    
    return (
        <div className="pokemon-card">
            <div className="icons"> 
                <div className="add" onClick={handleTeamClick}>
                    <i 
                        className="fa fa-plus-circle" 
                        style={{ color: isTeam ? 'lightblue' : '#C0C0C0' }} 
                    ></i>
                </div>

                <div className="favorite" onClick={handleFavoriteClick}>
                    <i 
                        className="fa fa-heart" 
                        style={{ color: isFavorite ? 'lightcoral' : '#C0C0C0', fontSize: '30px' }} 
                    ></i>
                </div>
            </div>
            
            <div className="card-link-wrapper">
                <Link to={`/pokedex/${pokemon.id}`} className="card-link">
                    <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                        className="card-img-top"
                        alt={pokemon.name}
                        style={{ width: '200px', height: '200px' }}
                    />
                    <div className="card-body">
                        <h3 className="fs-6 text-secondary"> Nº {formatId(pokemon.id)} </h3>
                        <h4 className="card-title mb-1 text-break"> {formatName(pokemon.name)} </h4>
                        <div className="types">
                            {pokemon.types.map((typeInfo, index) => (
                                <Pills key={index} type={typeInfo.type.name} />
                            ))}
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default PokemonCard;
