const express = require('express');
const router = express.Router();
const Weather = require('../models/weather');
const DailySummary = require('../models/DailySummary');
const moment = require('moment');
const axios = require('axios');

// Replace with your OpenWeatherMap API key
const API_KEY = '45f8e039323588d8267d14958c856c54';
const API_URL = 'http://api.openweathermap.org/data/2.5/weather';

// Function to fetch weather data from OpenWeatherMap
async function fetchWeatherFromAPI(city) {
  try {
    const response = await axios.get(API_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric' // Temperature in Celsius
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

// Route to get current weather data for a city
router.get('/weather/:city', async (req, res) => {
  try {
    const city = req.params.city;
    const weatherData = await fetchWeatherFromAPI(city);

    const weather = new Weather({
      city: weatherData.name,
      temp: weatherData.main.temp,
      feels_like: weatherData.main.feels_like,
      main: weatherData.weather[0].main,
      date: new Date(weatherData.dt * 1000) // Convert Unix timestamp to Date
    });

    await weather.save();
    res.json(weather);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching or saving weather data' });
  }
});

// Route to get daily weather summary
router.get('/daily-summary', async (req, res) => {
  try {
    const startDate = moment().startOf('day').subtract(7, 'days').toDate(); // 7 days ago
    const endDate = moment().endOf('day').toDate(); // End of today

    const dailySummary = await Weather.aggregate([
      {
        $match: {
          date: { $gte: startDate } // Filter documents within the last week
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
            day: { $dayOfMonth: "$date" }
          },
          avgTemp: { $avg: "$temp" },
          minTemp: { $min: "$temp" },
          maxTemp: { $max: "$temp" }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } // Sort by date
      }
    ]);

    res.json(dailySummary);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching daily summary' });
  }
});


// Route to get weather alerts
router.get('/alerts', async (req, res) => {
  try {
    const alerts = await Weather.find({
      temp: { $gte: 35 } // Example threshold
    });
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching alerts' });
  }
});

// Route to get weather trends
// Route to get weather trends
router.get('/weather-trends', async (req, res) => {
  try {
    const startDate = moment().subtract(7, 'days').startOf('day').toDate();
    const endDate = moment().endOf('day').toDate();

    const trends = await Weather.aggregate([
      {
        $match: {
          date: { $gte: startDate, $lt: endDate }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          avgTemp: { $avg: '$temp' }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    const labels = trends.map(trend => trend._id);
    const data = trends.map(trend => trend.avgTemp);

    // Fill in missing dates with null values if needed
    const missingDates = [];
    // for (let i = 0; i < 7; i++) {
    //   const date = moment().subtract(i, 'days').format('YYYY-MM-DD');
    //   if (!labels.includes(date)) {
    //     labels.push(date);
    //     data.push(null); // or 0 if you prefer to fill in with zeros
    //   }
    // }

    // Sort by date
    const sortedData = labels.map(date => {
      const index = labels.indexOf(date);
      return {
        label: date,
        value: data[index] || null
      };
    }).sort((a, b) => new Date(a.label) - new Date(b.label));

    const sortedLabels = sortedData.map(item => item.label);
    const sortedValues = sortedData.map(item => item.value);

    res.json({ labels: sortedLabels, data: sortedValues });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching weather trends' });
  }
});

router.get('/past-week-weather', async (req, res) => {
  try {
    const startDate = moment().subtract(7, 'days').startOf('day').toDate();
    const endDate = moment().subtract(1, 'days').endOf('day').toDate();

    // Fetch and sort data by date field
    const weatherData = await Weather.find({
       date: { $gte: startDate, $lt: endDate }
    }).sort({ date: 1 }); // Sort by date in ascending order

    // Convert dates to ISO strings if needed for consistency
    const formattedData = weatherData.map(data => ({
      ...data.toObject(),
      date: data.date.toISOString()
    }));

    res.json(formattedData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching weather data' });
  }
});


module.exports = router;
