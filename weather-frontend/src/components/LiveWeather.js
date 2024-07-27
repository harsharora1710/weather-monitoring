import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LiveWeather.css'; // Ensure to create this CSS file for styling

const LiveWeather = () => {
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState('C');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch weather data
  const fetchWeatherData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/weather/Delhi');
      setWeather(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching weather data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(); // Initial fetch
    const interval = setInterval(fetchWeatherData, 300000); // Update every 5 minutes

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const convertTemp = (temp) => {
    return unit === 'C' ? temp : (temp * 9/5) + 32;
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="live-weather-container">
      <h2>Live Weather in Delhi</h2>
      <div className="unit-toggle">
        <label>
          <input type="radio" value="C" checked={unit === 'C'} onChange={handleUnitChange} /> Celsius
        </label>
        <label>
          <input type="radio" value="F" checked={unit === 'F'} onChange={handleUnitChange} /> Fahrenheit
        </label>
      </div>
      {weather && (
        <div className="weather-card">
          <h3>{new Date(weather.date).toLocaleString().slice(0, 9)}</h3>
          <h3>Last Updated At: {new Date(weather.date).toLocaleString().slice(10)}</h3>
          <p><strong>Temperature:</strong> {convertTemp(weather.temp).toFixed(2)}°{unit}</p>
          <p><strong>Feels Like:</strong> {convertTemp(weather.feels_like).toFixed(2)}°{unit}</p>
          <p><strong>Weather:</strong> {weather.main}</p>
        </div>
      )}
    </div>
  );
};

export default LiveWeather;
