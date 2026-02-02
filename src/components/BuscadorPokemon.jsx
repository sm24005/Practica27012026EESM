import { useState, useEffect } from 'react';

function BuscadorPokemon() {
  const [listaPokemon, setListaPokemon] = useState([]); // Para el combo
  const [pokemonSeleccionado, setPokemonSeleccionado] = useState(''); // Nombre elegido
  const [datosPokemon, setDatosPokemon] = useState(null); // Datos del Pokémon (incluye imagen)
  const [cargando, setCargando] = useState(false);

  // 1. Cargar la lista inicial para el combo (limitamos a 151 para el ejemplo)
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(res => res.json())
      .then(data => setListaPokemon(data.results));
  }, []);

  // 2. Cargar los datos del Pokémon cuando cambie la selección del combo
  useEffect(() => {
    if (pokemonSeleccionado) {
      setCargando(true);
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonSeleccionado}`)
        .then(res => res.json())
        .then(data => {
          setDatosPokemon(data);
          setCargando(false);
        });
    }
  }, [pokemonSeleccionado]); // Este efecto corre cada vez que pokemonSeleccionado cambia

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Selecciona tu Pokémon</h1>

      {/* El Combo (Select) */}
      <select 
        value={pokemonSeleccionado} 
        onChange={(e) => setPokemonSeleccionado(e.target.value)}
        style={{ padding: '10px', fontSize: '16px', borderRadius: '5px' }}
      >
        <option value="">-- Elige uno --</option>
        {listaPokemon.map((p) => (
          <option key={p.name} value={p.name}>
            {p.name.toUpperCase()}
          </option>
        ))}
      </select>

      <hr />

      {/* Mostrar resultado */}
      {cargando && <p>Cargando datos...</p>}

      {datosPokemon && !cargando && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <h2>{datosPokemon.name.toUpperCase()}</h2>
          <img 
            src={datosPokemon.sprites.other['official-artwork'].front_default} 
            alt={datosPokemon.name}
            style={{ width: '250px' }}
          />
          <p><strong>ID:</strong> {datosPokemon.id}</p>
          <p><strong>Altura:</strong> {datosPokemon.height / 10} m</p>
        </div>
      )}
    </div>
  );
}

export default BuscadorPokemon;
