import { useState } from 'react';
import axios from 'axios';
function PokeApp() {
  const [busqueda, setBusqueda] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [error, setError] = useState(false);


  // Función para buscar el Pokémon
  const buscarPokemon = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${busqueda.toLowerCase()}`);
      if (!res.status==200) throw new Error();
      const data = await res.data;
      console.log(res);
      setPokemon(data);
    } catch (err) {
      setError(true);
      setPokemon(null);
    }
  };


  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h2>Buscador de Pokémon</h2>
     
      {/* Formulario de búsqueda */}
      <form onSubmit={buscarPokemon} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Ej: charizard o 6"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{ padding: '10px', width: '200px' }}
        />
        <button type="submit" style={{ padding: '10px 20px', marginLeft: '10px', cursor: 'pointer' }}>
          Buscar
        </button>
      </form>


      {error && <p style={{ color: 'red' }}>Pokémon no encontrado...</p>}


      {/* Tabla de Resultados */}
      {pokemon && (
        <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f4f4f4' }}>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              </td>
              <td>{pokemon.name.toUpperCase()}</td>
              <td>{pokemon.types.map(t => t.type.name).join(', ')}</td>
              <td>
                <button onClick={() => setModalAbierto(true)} style={{ cursor: 'pointer' }}>
                  Ver detalles
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      )}


      {/* --- MODAL --- */}
      {modalAbierto && pokemon && (
        <div style={estilosModal.overlay}>
          <div style={estilosModal.contenido}>
            <button onClick={() => setModalAbierto(false)} style={estilosModal.botonCerrar}>X</button>
           
            <h3>Información Detallada</h3>
            <img
              src={pokemon.sprites.other['official-artwork'].front_default}
              alt={pokemon.name}
              style={{ width: '150px' }}
            />
            <h2>{pokemon.name.toUpperCase()}</h2>
           
            <div style={{ textAlign: 'left' }}>
              <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
              <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
              <p><strong>Habilidades:</strong> {pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
              <p><strong>Estadísticas principales:</strong></p>
              <ul>
                {pokemon.stats.slice(0, 3).map(s => (
                  <li key={s.stat.name}>{s.stat.name}: {s.base_stat}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


// Estilos básicos para el Modal (puedes mover esto a un CSS)
const estilosModal = {
  overlay: {
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
    backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
  },
  contenido: {
    backgroundColor: 'white', padding: '30px', borderRadius: '15px',
    maxWidth: '400px', width: '90%', textAlign: 'center', position: 'relative'
  },
  botonCerrar: {
    position: 'absolute', top: '10px', right: '10px', border: 'none', background: 'none', fontSize: '20px', cursor: 'pointer'
  }
};


export default PokeApp;
