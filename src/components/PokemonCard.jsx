import { useState, useEffect } from 'react';

function PokemonCard() {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
      .then((response) => response.json())
      .then((data) => {
        setPokemon(data);
      });
  }, []);

  if (!pokemon) return <p>Cargando...</p>;

  return (
    <div style={{ textAlign: 'center', border: '1px solid #ccc', padding: '20px' }}>
      <h2>{pokemon.name.toUpperCase()}</h2>
      {/* Mostramos la imagen usando la propiedad sprites */}
      <img 
        src={pokemon.sprites.other['official-artwork'].front_default} 
        alt={pokemon.name} 
        style={{ width: '200px' }}
      />
    </div>
  );
}

export default PokemonCard;