import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import './DailySummary.css';

const DailySummary = () => {
  const [summary, setSummary] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/daily-summary');
        const today = moment().startOf('day');
        
        const todaySummary = response.data.filter(entry => {
          const entryDate = moment(`${entry._id.year}-${entry._id.month}-${entry._id.day}`, 'YYYY-M-D');
          return entryDate.isSame(today, 'day');
        });

        setSummary(todaySummary);
      } catch (error) {
        setError('Error fetching daily summary');
        console.error('Error fetching daily summary:', error);
      }
    };

    fetchSummary();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div className="daily-summary-container">
      <h2>Today's Weather Summary</h2>
      <div className="summary-list">
        {summary.length === 0 ? (
          <p>No data available for today.</p>
        ) : (
          summary.map((entry, index) => (
            <div key={index} className="summary-item">
              <h3>{`${entry._id.year}-${entry._id.month}-${entry._id.day}`}</h3>
              <p>Average Temperature: {entry.avgTemp.toFixed(2)}°C</p>
              <p>Minimum Temperature: {entry.minTemp.toFixed(2)}°C</p>
              <p>Maximum Temperature: {entry.maxTemp.toFixed(2)}°C</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DailySummary;
