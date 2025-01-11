import { useState, useEffect } from "react";
import BubbleCard from "../components/bubble-card/bubble-card";
import SearchBar from "../components/search-bar/search-bar";
import "../pages/home.css";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasSearchQuery, setHasSearchQuery] = useState(false);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
        const data = await response.json();
        const basicPokemons = data.results;

        const detailedPokemons = await Promise.all(
          basicPokemons.map(async (pokemon) => {
            try {
              const detailResponse = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
              );
              return await detailResponse.json();
            } catch (error) {
              console.error(`Error fetching details for ${pokemon.name}:`, error);
              return null;
            }
          })
        );

        setPokemons(detailedPokemons.filter(Boolean));
        setFilteredPokemons(detailedPokemons.filter(Boolean));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokémon list:", error);
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  const handleSearch = (query) => {
    if (query.length >= 2) {
      const filtered = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().startsWith(query.toLowerCase())
      );
      setFilteredPokemons(filtered.slice(0, 8));
      setHasSearchQuery(query.trim() !== "");
    } else {
      setFilteredPokemons([]);
      setHasSearchQuery(false);
    }
  };


  return (
    <div className="container home-container">
      <div className="circle circle-1"></div>
      <div className="circle circle-2"></div>
      <div className="circle circle-3"></div>
      <div className="circle circle-4"></div>

      <div className="container2">
        <img src="/public/logo.svg" alt="Pokemon Logo" className="logo" />
        <SearchBar onSearch={handleSearch} className="search-bar-container" />

        <div className="pokemon-list">
          {hasSearchQuery &&
            filteredPokemons.map((pokemon) => (
              <BubbleCard key={pokemon.id} pokemon={pokemon} showRemoveIcon={false} />
            ))}
        </div>
      </div>

      <div className="container3">
        <img src="/public/pikachu.png" alt="Pikachu" className="decorative-pokemon" />
      </div>
    </div>
  );
};

export default Home;
