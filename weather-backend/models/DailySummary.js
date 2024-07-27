const mongoose = require('mongoose');

const dailySummarySchema = new mongoose.Schema({
  city: String,
  date: Date,
  avgTemp: Number,
  maxTemp: Number,
  minTemp: Number,
  dominantCondition: String
});

module.exports = mongoose.model('DailySummary', dailySummarySchema);
