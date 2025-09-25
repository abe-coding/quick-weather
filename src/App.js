import React, { useState } from 'react';
import './App.css';
import WeatherCard from './components/WeatherCard';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = '2ad74e91d2c899e288d44b2dbdd4f5a7'; // Ganti dengan API key kamu

  const fetchWeather = async (e) => {
    e.preventDefault(); // Mencegah form refresh halaman
    if (!city) return;

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      const data = await response.json();
      
      if (response.ok) {
        setWeatherData(data);
      } else {
        alert(data.message);
        setWeatherData(null);
      }
    } catch (error) {
      alert('Gagal mengambil data cuaca.');
      console.error(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Quick Weather 🌦️</h1>
        <form onSubmit={fetchWeather} className="search-form">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Masukkan nama kota..."
          />
          <button type="submit">Cari</button>
        </form>
        
        {weatherData && <WeatherCard data={weatherData} />}
      </header>
    </div>
  );
}

export default App;