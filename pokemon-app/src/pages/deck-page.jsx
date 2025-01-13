import DeckCard from "../components/card-deck/card-deck";

import { useTeam } from "../context/TeamContext";
import "../pages/deck-page.css";

function Deck() {
  const { team } = useTeam();

  return (
    <div className="deck">
      <h1 className="titol">Deck</h1>
      {team.length > 0 ? (
        <div className="deck-cards">
          {team.map((id) => (
            <div key={id} className="deck-card">
              <DeckCard pokedexId={id} />
            </div>
          ))}
        </div>
      ) : (
        <p>No Pokémon in your team yet!</p>
      )}
    </div>
  );
}

export default Deck;
