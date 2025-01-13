import { useState } from "react";
import FavoritesList from "../components/favs-list/favs-list";
import TeamList from "../components/team-list/team-list";
import "../pages/favorites-page.css";

const FavoritesPage = () => {
  const [showWarning, setShowWarning] = useState(false);

  return (
    <div className="favorites-page">
    {showWarning && (
      <div className="modal-overlay">
        <div className="modal-content">
          <p>Your team is already full! Remove a Pokémon to add another.</p>
          <button onClick={() => setShowWarning(false)}>Close</button>
        </div>
      </div>
    )}
    <div className="team">
      <TeamList />
    </div>

    
    <FavoritesList 
        showWarning={showWarning} 
        setShowWarning={setShowWarning}
      />
      {showWarning && (
        <div className="warning">
         <span className="icon">⚠️</span> {/* Optional: icon for the warning */}
           You can only add up to 6 Pokémon to your team.
        </div>
      )}
  </div>
);
};

export default FavoritesPage;