import FavoritesList from "../components/favs-list/favs-list";
import TeamList from "../components/team-list/team-list";
import "../pages/favorites-page.css"

const FavoritesPage = () => {
  return (
    <div className="favorites-page">
        <div className="team">
            <TeamList />
        </div>
        <div className="favorites">
            <FavoritesList />
        </div>
    </div>
    );
  };
  
  export default FavoritesPage;
  