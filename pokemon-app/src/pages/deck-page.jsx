import DeckCard from "../components/card-deck/card-deck";
import { useTeam } from "../context/TeamContext";
import "../pages/deck-page.css" 
import Slider from "react-slick"; 

function Deck() {
  const { team } = useTeam(); 

  const settings = {
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 3,
    focusOnSelect: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: true,
        },
      },
    ],
  };

  return (
    <div className="deck">
    <h1 className="title">Deck</h1>
    {team.length > 0 ? (
      <Slider {...settings} className="carousel">
        {team.map((id) => (
          <div key={id} className="carousel-card">
            <DeckCard pokedexId={id} />
          </div>
        ))}
      </Slider>
    ) : (
      <p>No Pokémon in your team yet!</p>
    )}
  </div>
);
}

export default Deck;
