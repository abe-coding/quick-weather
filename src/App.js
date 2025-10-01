import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import WeatherPage from './components/WeatherPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/quick-weather" element={<Welcome />} />
        <Route path="/weather" element={<WeatherPage />} />
      </Routes>
    </Router>
  );
}

export default App;