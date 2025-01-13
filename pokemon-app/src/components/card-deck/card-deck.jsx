import { useState, useEffect } from "react";
import axios from "axios";
import "../card-deck/card-deck.css";

const cache = {}; // Cache para almacenar imágenes ya obtenidas.

function DeckCard({ pokedexId }) {
  const [cardData, setCardData] = useState(null);
  const [error, setError] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const typeIcons = {
    Fire: "/public/types/fire_black.png",
    Water: "/public/types/water-black.png",
    Grass: "/public/types/grass-black.png",
    Lightning: "/public/types/electric-black.png",
    Psychic: "/public/types/psychic_type_symbol_tcg_by_jormxdos_dfgddbk-fullview.png",
    Fighting: "/public/types/fight-black.png",
    Darkness: "/public/types/dark-black.png",
    Metal: "/public/types/metal-black.png",
    Fairy: "/public/types/fairy-black.png",
    Dragon: "/public/types/dragon-black.png",
    Colorless: "/public/types/colorless.png",
  };

  const fetchCardData = async (id) => {
    if (cache[id]) {
      setCardData(cache[id]);
      setError(false);
      return;
    }

    const apiKey = "b7604c4a-22d0-4720-b624-c20d43cc8e40";
    const url = `https://api.pokemontcg.io/v2/cards?q=nationalPokedexNumbers:${id}`;

    try {
      const response = await axios.get(url, {
        headers: {
          "X-Api-Key": apiKey,
        },
      });

      if (response.data.data && response.data.data.length > 0) {
        const card = response.data.data[0];
        const cardDetails = {
          name: card.name,
          hp: card.hp || "Unknown",
          types: card.types || [],
          abilities: card.abilities || [],
          attacks: card.attacks || [],
          weaknesses: card.weaknesses || [],
          resistances: card.resistances || [],
          retreatCost: card.retreatCost ? card.retreatCost.length : 0,
          imageURL: card.images.small,
        };
        cache[id] = cardDetails;
        setCardData(cardDetails);
        setError(false);
      } else {
        console.warn(`No card found for Pokédex ID: ${id}`);
        setError(true);
      }
    } catch (err) {
      console.error(`Error fetching card for Pokédex ID ${id}:`, err);
      setError(true);
    }
  };

  useEffect(() => {
    if (pokedexId) {
      fetchCardData(pokedexId);
    }
  }, [pokedexId]);

  return (
    <div className="deck-card">
      {error ? (
        <p className="error-message">Card not found. Please check the National Pokédex ID.</p>
      ) : cardData ? (
        <div className="card-container">
          <img
            src={cardData.imageURL}
            alt={`${cardData.name} card`}
            className="card-image"
            onClick={() => setShowDetails(true)}
          />
          {showDetails && (
            <div className="modal-overlay" onClick={() => setShowDetails(false)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={() => setShowDetails(false)}>
                  ✖
                </button>
                <h2 className="card-name"><strong>{cardData.name}</strong></h2>
                <p className="card-hp">
                  HP {cardData.hp}
                  {cardData.types.map((type) => (
                    <img
                      key={type}
                      src={typeIcons[type] || "/icons/default.png"}
                      alt={`${type} icon`}
                      className="type-icon"
                    />
                  ))}
                </p>
                {/* Resto del contenido de la tarjeta */}
              </div>
            </div>
          )}
        </div>
      ) : (
        <img
          className="loading"
          src="/loadingball.gif"
          alt="Loading..."
        />
      )}
    </div>
  );
}

export default DeckCard;
