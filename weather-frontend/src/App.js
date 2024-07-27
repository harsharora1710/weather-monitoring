import React from 'react';
import DailySummary from './components/DailySummary';
import WeatherTrends from './components/WeatherTrends';
import Alerts from './components/WeatherAlerts';
import './App.css';
import WeatherAlerts from './components/WeatherAlerts';
import PastWeekWeather from './components/pastWeekWeather';
import LiveWeather from './components/LiveWeather';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Monitoring Dashboard</h1>
      </header>
      <main>
         <LiveWeather />
        <DailySummary />
        {/* <WeatherTrends /> */}
        <WeatherAlerts />
        {/* <Alerts /> */}
        <PastWeekWeather/>
      </main>
    </div>
  );
}

export default App;
