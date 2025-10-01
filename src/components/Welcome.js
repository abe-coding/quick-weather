import React from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-box">
        <span className="logo" role="img" aria-label="weather-logo">☀️</span>
        <h1>Welcome to Quick Weather</h1>
        <p>Your simple and fast weather checking app.</p>
        <Link to="/weather" className="start-button">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Welcome;