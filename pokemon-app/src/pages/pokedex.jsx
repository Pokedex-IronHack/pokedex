
import PokemonList from "../components/pokemon-list/pokemon-list";
import "../pages/pokedex.css"
import { useState } from "react";

const Pokedex = () => {
  const [showWarning, setShowWarning] = useState(false);
    return <div className="pokedex">
      
    <PokemonList showWarning={showWarning} setShowWarning={setShowWarning}/></div>;
    
  };
  
  export default Pokedex;
  