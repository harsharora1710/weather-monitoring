const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WeatherSchema = new Schema({
  city: {
    type: String,
    required: true
  },
  temp: {
    type: Number,
    required: true
  },
  feels_like: {
    type: Number,
    required: true
  },
  main: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Weather = mongoose.model('Weather', WeatherSchema);

module.exports = Weather;
