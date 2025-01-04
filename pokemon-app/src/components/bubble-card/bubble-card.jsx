import { useNavigate } from "react-router-dom";
import "./bubble-card.css";

const BubbleCard = ({ pokemon }) => {
  const navigate = useNavigate();  // Access the navigate function

  const handleCardClick = () => {
    // Programmatically navigate to the detailed Pokémon page
    navigate(`/pokedex/${pokemon.id}`, { replace: true });
    window.location.reload();  // Force a page reload
  };

  return (
    <div className="d-flex flex-wrap justify-content-center gap-4">
      <div className="bubbleCard">
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
