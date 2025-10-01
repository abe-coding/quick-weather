import React from 'react';
import './WeatherCard.css';

const WeatherCard = ({ data }) => {
  console.log(data);
  if (!data) return null;

  const { name, main, weather, wind } = data;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return (
    <div className="weather-card">
      <h2>{name}</h2>
      <div className="weather-details">
        <img src={iconUrl} alt={weather[0].description} />
        <div className="temperature">{Math.round(main.temp)}°C</div>
        <div className="description">{weather[0].description}</div>
      </div>
      <div className="extra-info">
        <p>Kelembapan: {main.humidity}%</p>
        <p>Kecepatan Angin: {wind.speed} m/s</p>
      </div>
    </div>
  );
};

export default WeatherCard;