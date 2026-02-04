import { useState, useEffect } from 'react';
import pokeAPI from '../pokeAPI';
function PokemonCard() {
  const [pokemon, setPokemon] = useState(null);


  useEffect(() => {
     console.log(pokeAPI);
    pokeAPI.get('/pokemon/psyduck')
      .then((response) => {
        setPokemon(response.data);
        console.log(response);
      }).catch((error) => {
        console.error('Error fetching the Pokémon data:', error);
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
