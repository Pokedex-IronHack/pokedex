import React, { useState, useEffect } from 'react';
import BubbleCard from '../components/bubble-card/bubble-card';

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await response.json();
        const basicPokemons = data.results;

        const detailedPokemons = await Promise.all(
          basicPokemons.map(async (pokemon) => {
            try {
              const detailResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
              return await detailResponse.json();
            } catch (error) {
              console.error(`Error fetching details for ${pokemon.name}:`, error);
              return null;
            }
          })
        );

        setPokemons(detailedPokemons.filter(Boolean));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokémon list:", error);
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  if (loading) {
    return <div>Cargando Pokémon...</div>;
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Pokédex - Primera Generación</h1>
      <div className="d-flex flex-wrap justify-content-center gap-4">
        {pokemons.map((pokemon) => (
          <BubbleCard 
            key={pokemon.id}
            imageUrl={pokemon.sprites.front_default}
    altText={pokemon.name}
    />
    ))}
    </div>
    </div>
    );
    };

    export default Home;