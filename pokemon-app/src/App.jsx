import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Pokedex from './pages/pokedex'
import Favorites from './pages/favorites-page'
import Deck from './pages/deck-page'
import Navbar from "./components/navbar/navbar"
import PokemonDetailPage from './pages/pokedex-details'
import { FavoritesProvider } from './context/FavoritesContext'
import { TeamProvider } from './context/TeamContext'

function App() {
  return (
    <FavoritesProvider>
    <TeamProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path='/pokedex/:id' element = {<PokemonDetailPage/>} /> 
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/deck" element={<Deck/>} />
      </Routes>
    </Router>
    </TeamProvider>
    </FavoritesProvider>
  )
}

export default App