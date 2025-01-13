import { useState, useEffect } from "react";
import axios from "axios";

const cache = {}; // Cache para almacenar imágenes ya obtenidas.

function DeckCard({ pokedexId }) {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCardImage = async (id) => {
      if (cache[id]) {
        // Si ya tenemos la imagen en la caché, úsala directamente
        setImage(cache[id]);
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
          const cardImageUrl = response.data.data[0].images.small;
          cache[id] = cardImageUrl; // Almacena la URL en la caché
          setImage(cardImageUrl);
          setError(false);
        } else {
          setError(true);
          console.warn(`No card found for Pokédex ID: ${id}`);
        }
      } catch (err) {
        console.error(`Error fetching card for Pokédex ID ${id}:`, err);
        setError(true);
      }
    };

    if (pokedexId) {
      fetchCardImage(pokedexId);
    }
  }, [pokedexId]);

  return (
    <div>
      {error ? (
        <p>Card not found. Please check the National Pokédex ID.</p>
      ) : image ? (
        <img src={image} alt={`Card with Pokédex ID: ${pokedexId}`} />
      ) : (
        <img
          className="loading"
          src="/loadingball.gif" // Ruta relativa válida
          alt="Loading..."
        />
      )}
    </div>
  );
}

export default DeckCard;
