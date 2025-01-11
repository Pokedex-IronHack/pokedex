import DeckCard from "../components/card-deck/card-deck";
import { useTeam } from "../context/TeamContext";
import "../pages/deck-page.css"
function Deck() {
  const { team } = useTeam(); // Call the `useTeam` hook

  return (
    <div className="deck">
      <h1 className="title">Deck</h1>
      <div className ="team-cards">
      {team.map((id) => (
        <DeckCard key={id} pokedexId={id} /> // Add a unique `key` for each item
      ))}
      </div>
    </div>
  );
}

export default Deck;
