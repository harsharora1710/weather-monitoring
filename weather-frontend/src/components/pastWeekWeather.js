import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PastWeekWeather.css';

const PastWeekWeather = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/daily-summary');
        const data=response.data;
        const  data2 = data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setWeatherData(data2);
      } catch (error) {
        setError('Error fetching past week weather data');
        console.error('Error fetching past week weather data', error);
      }
    };

    fetchWeatherData();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div className="past-week-weather-container">
      <h2>Past Week Weather Data</h2>
      <table className="weather-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Max Temp (°C)</th>
            <th>Min Temp (°C)</th>
            <th>Avg Temp (°C)</th>
            {/* <th>Humidity (%)</th> */}
          </tr>
        </thead>
        <tbody>
          {weatherData.map((data, index) => (
            <tr key={index}>
              <td>{`${data._id.year}-${data._id.month}-${data._id.day}`}</td>
              <td>{Number.isFinite(data.maxTemp) ? data.maxTemp.toFixed(2) : 'N/A'}</td>
              <td>{Number.isFinite(data.minTemp) ? data.minTemp.toFixed(2) : 'N/A'}</td>
              <td>{Number.isFinite(data.avgTemp) ? data.avgTemp.toFixed(2) : 'N/A'}</td>
              {/* <td>{Number.isFinite(data.humidity) ? data.humidity.toFixed(2) : 'N/A'}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PastWeekWeather;
