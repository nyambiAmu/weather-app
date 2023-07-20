/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/alt-text */
import logo from './logo.svg';
import './App.css';

import WeatherService from './Componets/WeatherService';
import { WiStrongWind, WiHumidity} from 'react-icons/wi';

import React, { useState, useEffect } from 'react';

function App() {
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [cityName, setCityName] = useState(' ')
  const { weather, refetch } = WeatherService(cityName);
  console.log(weather);
  
  

  const getWindIcon = () => {
    console.log(weather?.wind, weather?.wind.speed);
    if (weather?.wind && weather?.wind.speed >= 10) {
      return <WiStrongWind size={5} />;
    }
    return null;
  };

  const getHumidityIcon = () => {
    if (weather?.main && weather?.main.humidity >= 50) {
      return <WiHumidity size={70} />;
    }
    return null;
  };
  const convertToCelsius = (kelvin) => {
    if (kelvin === '-') return '-';
    return (kelvin - 273.15).toFixed(0) ;
  };
 
 
  const img = 'https://openweathermap.org/img/wn/' + weather?.weather[0].icon + '.png'
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
      <input type='text' placeholder='Enter city name' value={cityName} onChange={(e) => setCityName(e.target.value)} />
      <button onClick={refetch}
          style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', borderRadius: '15px', cursor: 'pointer' }}
        >
      Search</button>
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{weather?.name}</p>
            </div>
            <div className="temp">
            
              {weather?.main ? (
                
                <h1>{convertToCelsius(weather?.main.temp)}°C</h1>
              ) : null}
            </div>
            <div className="description">
              {weather?.weather ? (
                <>
      
                  <img src={img} style={{ width: '200px', height: '200px' }} />
                  <p>{weather?.weather[0].main}</p>
                </>
              ) : null}
            </div>
          </div>
          {weather?.name !== undefined && (
            <div className="bottom">
              <div className="feels">
                {weather?.main ? (
                  <>
                    <p className="bold">{weather?.main.feels_like.toFixed()}°</p>
                    <p>Feels Like</p>
                  </>
                ) : null}
              </div>
              <div className="humidity">
                {weather?.main ? (
                  <>
                    {getHumidityIcon()}
                    <p className="bold">{weather?.main.humidity}%</p>
                    <p>Humidity</p>
                  </>
                ) : null}
              </div>
              <div className="wind">
                {weather?.wind ? (
                  <>
                    {getWindIcon()}
                    <p className="bold">{weather?.wind.speed.toFixed()} m/s</p>
                    <p>Wind Speed</p>
                  </>
                ) : null}
              </div>
            </div>
          )}
        </div>
      
      </div>
      <div className="current-time">
        <p>{currentDateTime}</p>
      </div>
      </div>
    
  );
}

export default App;