import React from 'react';
import BubbleCard from '../components/bubble-card/bubble-card';

const Home = () => {
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Pokédex - Primera Generación</h1>
      <div className="d-flex flex-wrap justify-content-center gap-4">
        <BubbleCard />
      </div>
    </div>
  );
};

export default Home;
