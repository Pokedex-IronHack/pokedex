import { useNavigate } from "react-router-dom";
import "./bubble-card.css";
import { useState } from "react";
import { useTeam } from "../../context/TeamContext";

const BubbleCard = ({ pokemon, showRemoveIcon = true }) => {
  const navigate = useNavigate();
  const { team, setTeam } = useTeam();

  const handleCardClick = () => {
    navigate(`/pokedex/${pokemon.id}`, { replace: true });
    window.location.reload();
  };

  function eliminateFavorite(item) {
    setTeam((prev) => prev.filter((team) => team !== item));
  }

  function handleEliminateClick(e) {
    e.stopPropagation();
    eliminateFavorite(pokemon.id);
  }

  return (
    <div className="d-flex flex-wrap justify-content-center gap-4">
      <div className="bubbleCard">
        {showRemoveIcon && (
          <div className="remove" onClick={handleEliminateClick}>
            <ion-icon name="remove-circle" style={{ color: "lightcoral" }}></ion-icon>
          </div>
        )}
        <div className="bubble-link" onClick={handleCardClick}>
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            className="cardImage"
          />
        </div>
      </div>
    </div>
  );
};

export default BubbleCard;
