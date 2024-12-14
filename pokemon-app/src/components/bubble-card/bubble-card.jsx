import React from "react";
import "./bubble-card.css";

const BubbleCard = ({ pokemons }) => {
  return (
    <div className="d-flex flex-wrap justify-content-center gap-4">
      {pokemons.map((pokemon) => (
        <div key={pokemon.id} className="bubbleCard">
          <img 
            src={pokemon.sprites.other["official-artwork"].front_default} 
            alt={pokemon.name} 
            className="cardImage" 
          />
        </div>
      ))}
    </div>
  );
};

export default BubbleCard;
