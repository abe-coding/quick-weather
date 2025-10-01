import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import WeatherCard from './WeatherCard';
import '../App.css';

const WeatherPage = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const openWeatherApiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
  const rapidApiKey = process.env.REACT_APP_RAPIDAPI_KEY;

  const geoApiOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': rapidApiKey,
      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
    },
  };

  const loadOptions = async (inputValue) => {
    if (inputValue.length < 3) return [];

    try {
      const response = await fetch(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=50000&namePrefix=${inputValue}&limit=5`,
        geoApiOptions
      );

      const data = await response.json();
      return data.data.map((city) => ({
        value: `${city.latitude} ${city.longitude}`,
        label: `${city.name}, ${city.countryCode}`,
      }));

    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
  };

  const fetchWeather = async (e) => {
    e.preventDefault();
    if (!selectedCity) return;
    
    const [lat, lon] = selectedCity.value.split(" ");

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}&units=metric`);
      const data = await response.json();
      if (response.ok) {
        setWeatherData(data);
      } else {
        alert(data.message);
        setWeatherData(null);
      }
    } catch (error) {
      alert('Gagal mengambil data cuaca.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Quick Weather 🌦️</h1>
        <form onSubmit={fetchWeather} className="search-form">
          <AsyncSelect
            placeholder="Ketik nama kota..."
            cacheOptions
            defaultOptions
            loadOptions={loadOptions}
            onChange={handleCityChange}
            value={selectedCity}
            styles={{ 
              control: (provided) => ({
                ...provided,
                width: '300px',
                borderRadius: '8px',
                border: 'none',
              }),
              input: (provided) => ({
                ...provided,
                color: '#282c34',
              }),
            }}
          />
          <button type="submit">Cari</button>
        </form>
        {weatherData && <WeatherCard data={weatherData} />}
      </header>
    </div>
  );
};

export default WeatherPage;