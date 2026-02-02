
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PokemonCard from './components/PokemonCard'; 
import BuscadorPokemon from './components/BuscadorPokemon'; 
import Home from './components/Home'; 
import PokeApp from './components/PokeApp'; 
import './App.css'

function App() {
  return (
  <BrowserRouter>
      {/* Navigation */}
      <nav>
         <Link to="/">Home</Link> |
         <Link to="/card">Card pokemon</Link> |
         <Link to="/searchpokemon">Buscar pokemon</Link> |
          <Link to="/poke">App Poke</Link>
      </nav>

      {/* Routes */}
      <Routes>        
        <Route path="/" element={<Home />} />
        <Route path="/card" element={<PokemonCard />} />
        <Route path="/searchpokemon" element={<BuscadorPokemon />} />
        <Route path="/poke" element={<PokeApp />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
