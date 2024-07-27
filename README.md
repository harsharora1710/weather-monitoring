# Weather Monitoring System

This project is a comprehensive Weather Monitoring System that fetches live weather data, displays daily summaries, and triggers alerts when specified thresholds are breached. The system is built using Node.js for the backend, React.js for the frontend, and MongoDB for data storage. Docker is used for containerization.

## Project Overview

The Weather Monitoring System fetches live weather data from an external API, processes it, and displays daily summaries and alerts on the frontend. Users can view live weather updates, daily summaries, and alerts for specific weather conditions.

### It will give live weather forecast. Can give alerts daily summary and past day week summary. Once the data is collected and stored in DB. It will take some time. After every 5 mins the temperature will be recorded. 

## Features

- **Live Weather Data:** Fetches live weather data every 5 minutes.
- **Daily Summaries:** Calculates and displays average, minimum, and maximum temperatures for the day.
- **Weather Alerts:** Triggers alerts when temperature thresholds are breached.
- **Temperature Units:** Allows users to switch between Celsius and Fahrenheit.
- **Responsive Design:** Optimized for both desktop and mobile devices.

## Technologies Used

- **Backend:** Node.js, Express.js, MongoDB
- **Frontend:** React.js, Axios
- **Containerization:** Docker, Docker Compose
- **Styling:** CSS, Flexbox

## Setup Instructions

### Running with Docker

1. **Clone the repository:**

   ```bash
   git clone https://github.com/harsharora1710/weather-monitoring.git
   cd weather-monitoring
   ```

2. **Build and start the containers:**
   ```bash
   docker-compose up --build
   ```

The application will be accessible at `http://localhost:3000` for the frontend and `http://localhost:8080` for the backend.

### You have to enter your MongoDB link in place of "YOUR_MONGO_URL".

## Usage

1. **Open the application in your browser.**
2. **Live Weather:** The Live Weather component displays the current weather data.
3. **Daily Summary:** The Daily Summary component shows the weather summary for the current day.
4. **Weather Alerts:** The Weather Alerts component displays alerts if any weather thresholds are breached.

## Design Choices

- **Modular Architecture:** Separated frontend and backend into distinct directories for better manageability.
- **Dockerization:** Used Docker and Docker Compose for containerization to ensure consistency across different environments.
- **Responsive Design:** Ensured the UI is responsive and user-friendly on both desktop and mobile devices.
- **State Management:** Used React's useState and useEffect hooks for state management and side-effects handling.
- **Data Fetching:** Used Axios for making HTTP requests to the backend.
