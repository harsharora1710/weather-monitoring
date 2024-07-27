


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './WeatherAlerts.css';

const WeatherAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/alerts');
        setAlerts(response.data);
      } catch (error) {
        setError('Error fetching alerts');
        console.error('Error fetching alerts', error);
      }
    };

    fetchAlerts();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div className="weather-alerts-container">
      <h2>Weather Alerts (Above 35*C)</h2>
      <div className="alerts">
        {alerts.length === 0 ? (
          <p>No alerts at the moment.</p>
        ) : (
          alerts.map((alert, index) => (
           <div key={index} className="alert">
              <h3>{alert.date.slice(0,10)}</h3>
              <p>Temperature: {alert.temp}°C</p>
              <p>Temperature feels like: {alert.feels_like}°C</p>
              <p>City: {alert.city}</p>
              <p>Condition: {alert.main}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WeatherAlerts;
