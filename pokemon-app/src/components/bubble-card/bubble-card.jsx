import React from "react";
import "./bubble-card.css"; // Asegúrate de que el archivo exista

const BubbleCard = ({ imageUrl, altText }) => {
  return (
    <div className="bubbleCard">
      <img 
        src={imageUrl} 
        alt={altText} 
        className="cardImage" 
      />
    </div>
  );
};

export default BubbleCard;
