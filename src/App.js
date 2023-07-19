import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { WiStrongWind, WiHumidity, WiCloud, WiDaySunny, WiRain, WiSnow } from 'react-icons/wi';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=ba6704ed3d70ea9cadddd1dd58219724`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation('');
    }
  };

  const getWindIcon = () => {
    if (data.wind && data.wind.speed >= 10) {
      return <WiStrongWind size={24} />;
    }
    return null;
  };

  const getHumidityIcon = () => {
    if (data.main && data.main.humidity >= 50) {
      return <WiHumidity size={70} />;
    }
    return null;
  };

  const getWeatherIcon = () => {
    if (data.weather && data.weather[0]) {
      const weather = data.weather[0].main;
      switch (weather) {
        case 'Clouds':
          return <WiCloud size={70} />;
        case 'Clear':
          return <WiDaySunny size={70} />;
        case 'Rain':
          return <WiRain size={70} />;
        case 'Snow':
          return <WiSnow size={70} />;
        default:
          return null;
      }
    }
    return null;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date();
      setCurrentDateTime(
        `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter city"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? (
              <>
                {getWeatherIcon()}
                <p>{data.weather[0].main}</p>
              </>
            ) : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <>
                  <p className="bold">{data.main.feels_like.toFixed()}°C</p>
                  <p>Feels Like</p>
                </>
              ) : null}
            </div>
            <div className="humidity">
              {data.main ? (
                <>
                  {getHumidityIcon()}
                  <p className="bold">{data.main.humidity}%</p>
                  <p>Humidity</p>
                </>
              ) : null}
            </div>
            <div className="wind">
              {data.wind ? (
                <>
                  {getWindIcon()}
                  <p className="bold">{data.wind.speed.toFixed()} m/s</p>
                  <p>Wind Speed</p>
                </>
              ) : null}
            </div>
          </div>
        )}
      </div>
      <div className="current-time">
        <p>{currentDateTime}</p>
      </div>
    </div>
  );
}

export default App;
