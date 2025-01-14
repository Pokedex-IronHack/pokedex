import { useState, useEffect } from 'react';
import axios from 'axios';
import "../card-deck/card-deck.css";

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
    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `https://api.pokemontcg.io/v2/cards?q=nationalPokedexNumbers:${id}`;

    try {
      const response = await axios.get(url, {
        headers: {
          "X-Api-Key": apiKey,
        },
      });

      if (response.data.data && response.data.data.length > 0) {
        const card = response.data.data[0];
        setError(false);
        setCardData({
          name: card.name,
          hp: card.hp || "Unknown",
          types: card.types || [],
          abilities: card.abilities || [],
          attacks: card.attacks || [],
          weaknesses: card.weaknesses || [],
          resistances: card.resistances || [],
          retreatCost: card.retreatCost ? card.retreatCost.length : 0,
          imageURL: card.images.small,
        });
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Error fetching the card:", error);
      setError(true);
    }
  };

  useEffect(() => {
    fetchCardData(pokedexId);
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
            <div className="modal-overlay" onMouseLeave={() => setShowDetails(false)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2 className="card-name"><strong>{cardData.name}</strong></h2>

                <p className="card-hp">
                  HP {cardData.hp}{cardData.types.map((type) => (
                    <img
                      key={type}
                      src={typeIcons[type] || "/icons/default.png"}
                      alt={`${type} icon`}
                      className="type-icon"
                    />
                  ))}
                </p>

                {cardData.abilities.length > 0 && (
                  <div className="abilities-section">
                    <h3 className="abs-title">Abilities</h3>
                    <ul>
                      {cardData.abilities.map((ability, index) => (
                        <li key={index}>
                          <strong>{ability.name}</strong>: <p>{ability.text}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {cardData.attacks.length > 0 && (
                  <div className="attacks-section">
                    <h3 className="attack-title">Attacks</h3>
                    <ul>
                      {cardData.attacks.map((attack, index) => (
                        <li key={index}>
                          <strong>{attack.name}</strong>
                          <span>{attack.damage || "No damage"}</span>
                          <div className="energy-cost">
                            {attack.cost.map((energyType, i) => (
                              <img
                                key={i}
                                src={typeIcons[energyType] || "/icons/colorless.png"}
                                alt={`${energyType} icon`}
                                className="type-icon"
                              />
                            ))}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {cardData.weaknesses.length > 0 && (
                  <div className="weaknesses-section">
                    <h3 className="weak-title">Weaknesses</h3>
                    <ul>
                      {cardData.weaknesses.map((weakness, index) => (
                        <li key={index}>
                          <img
                            src={typeIcons[weakness.type] || "/icons/default.png"}
                            alt={`${weakness.type} icon`}
                            className="type-icon"
                          />
                          <span>{weakness.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <img className="loading" src="/loadingball.gif" alt="Loading..." />
      )}
    </div>
  );
}

export default DeckCard;
