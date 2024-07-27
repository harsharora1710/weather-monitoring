import React, { useEffect, useState, useRef } from 'react';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, TimeScale } from 'chart.js';
import 'chartjs-adapter-moment';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, TimeScale);

const WeatherTrends = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/weather-trends');
        const { labels, data: trendData } = response.data;

        if (labels.length === 0 || trendData.length === 0) {
          setError('No data available');
          setLoading(false);
          return;
        }

        const chartData = {
          labels,
          datasets: [
            {
              label: 'Average Temperature (°C)',
              data: trendData,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderWidth: 1,
            },
          ],
        };

        setData(chartData);
      } catch (error) {
        setError('Error fetching weather trends');
        console.error('Error fetching weather trends', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      // Clean up chart instance when component unmounts
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Weather Trends</h2>
      <Line
        ref={chartRef}
        data={data}
        options={{
          responsive: true,
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day',
              },
              title: {
                display: true,
                text: 'Date',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Temperature (°C)',
              },
              ticks: {
                callback: function (value) {
                  return value.toFixed(2); // Ensure y-axis values are properly formatted
                },
              },
            },
          },
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return `Temperature: ${context.raw.toFixed(2)} °C`;
                },
              },
            },
          },
        }}
      />
    </div>
  );
};

export default WeatherTrends;
