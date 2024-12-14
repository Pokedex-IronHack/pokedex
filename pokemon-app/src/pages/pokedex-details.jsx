import { useParams } from "react-router-dom";
import PokemonDetail from "../components/pokemon-detail/pokemon-detail";

function PokemonDetailPage (){
    const {id} = useParams(); 

    return (
        
        <PokemonDetail id = {id}/> 
         
    )
}

export default PokemonDetailPage; 