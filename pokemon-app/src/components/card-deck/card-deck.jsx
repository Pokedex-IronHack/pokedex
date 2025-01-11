import { useState, useEffect } from 'react';
import axios from 'axios';

function DeckCard({ pokedexId }) {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(false);

  const fetchCardImage = async (id) => {
    const apiKey = "b7604c4a-22d0-4720-b624-c20d43cc8e40"; // Replace with your actual API key
    const url = `https://api.pokemontcg.io/v2/cards?q=nationalPokedexNumbers:${id}`;

    try {
      const response = await axios.get(url, {
        headers: {
          "X-Api-Key": apiKey,
        },
      });

      if (response.data.data && response.data.data.length > 0) {
        const cardImageUrl = response.data.data[0].images.small;
        console.log("Card Image URL:", cardImageUrl);
        setError(false);
        return cardImageUrl;
      } else {
        console.log("Card not found");
        setError(true);
        return null;
      }
    } catch (error) {
      console.error("Error fetching the card:", error);
      setError(true);
      return null;
    }
  };

  useEffect(() => {
    const getCardImage = async () => {
      const cardImageUrl = await fetchCardImage(pokedexId);
      setImage(cardImageUrl);
    };

    getCardImage();
  }, [pokedexId]);

  return (
    <div>
      {error ? (
        <p>Card not found. Please check the National Pokédex ID.</p>
      ) : image ? (
        <img src={image} alt={`Card with Pokédex ID: ${pokedexId}`} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default DeckCard;
