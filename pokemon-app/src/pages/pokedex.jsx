
import PokemonList from "../components/pokemon-list/pokemon-list";
import "../pages/pokedex.css"
import { useState } from "react";

const Pokedex = () => {
  const [showWarning, setShowWarning] = useState(false);
    return <div className="pokedex">
      <h1 className="titol">Pokedex</h1>
      
    <PokemonList showWarning={showWarning} setShowWarning={setShowWarning}/></div>;
    
  };
  
  export default Pokedex;
  