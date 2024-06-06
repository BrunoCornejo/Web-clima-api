import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './App.css';

const API_WEATHER = `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&lang=es&q=`;

function App() {
  const [ciudad, setCiudad] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [clima, setClima] = useState(null);
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false); 

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setMostrarTarjeta(false); 

    try {
      if (!ciudad.trim()) throw new Error('El campo ciudad es obligatorio');

      const res = await fetch(API_WEATHER + ciudad);
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      setClima({
        city: data.location.name,
        pais: data.location.country,
        temperatura: data.current.temp_c,
        condicionText: data.current.condition.text,
        icono: data.current.condition.icon,
      });

      setMostrarTarjeta(true); 

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="container mt-5">
        <h1 className="text-center text-white">Clima App</h1>
        <form onSubmit={onSubmit} className="mt-4">
          <div className="mb-3">
            <label htmlFor="city" className="form-label text-white">Ciudad</label>
            <input
              type="text"
              className="form-control"
              id="city"
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
              required
            />
            {error && <div className="text-danger mt-2">{error}</div>}
          </div>
          <div className='contenedorBtn'>
            <button className="btnBuscar" disabled={loading}>
              {loading ? 'BUSCANDO...' : 'BUSCAR'}
            </button>
          </div>

        </form>

        {mostrarTarjeta && clima && (
          <motion.div
            className="weather-card mt-4 text-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2>{clima.city}, {clima.pais}</h2>
            <img src={clima.icono} alt={clima.condicionText} />
            <h3>{clima.temperatura} °C</h3>
            <p>{clima.condicionText}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default App;
