import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
//import { Link } from 'react-router-dom'
import Home from './pages/home'
import Pokedex from './pages/pokedex'
import Favorites from './pages/favorites'
import Navbar from "./components/navbar/navbar"
import PokemonDetailPage from './pages/pokedex-details'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path='/pokedex/:id' element = {<PokemonDetailPage/>} /> 
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  )
}

export default App