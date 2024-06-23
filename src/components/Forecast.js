import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactAnimatedWeather from "react-animated-weather";

function Forecast({ weather }) {
  const { data } = weather;
  const [forecastData, setForecastData] = useState([]);
  const [isCelsius, setIsCelsius] = useState(true); // Track temperature unit
  const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY
  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${data.city}&units=metric&appid=${apiKey}`
  }, [data.city]);

  const formatDay = (dateString) => {
    const options = { weekday: "short" };
    const date = new Date(dateString * 1000);
    return date.toLocaleDateString("en-US", options);
  };

  const getCurrentDate = () => {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    };
    const currentDate = new Date().toLocaleDateString("en-US", options);
    return currentDate;
  };

  const toggleTemperatureUnit = () => {
    setIsCelsius((prevState) => !prevState);
  };

  const convertToCelsius = (temperature) => {
    return Math.round((temperature - 32) * (5 / 9));
  };

  const convertToFahrenheit = (temperature) => {
    return Math.round((temperature * 9) / 5 + 32);
  };

  const renderTemperature = (temperature) => {
    if (isCelsius) {
      return Math.round(temperature);
    } else {
      return convertToFahrenheit(temperature);
    }
  };
    

  if (!data || Object.keys(data).length === 0) {
    // If data is empty or undefined, return a loading message or handle the error size
    return <div> wait Loading...</div>; 
  }
    return (
    <>
    <div>
      <div className="city-name">
        {data.name && <h2>
          {data.name}, 
          {<span>{data.sys.country}</span>}
        </h2>}
      </div>
      <div className="date">
        <span>{getCurrentDate()}</span>
      </div>
      <div className="temp">
        {data.main.temp ? renderTemperature(data.main.temp):null }
        <sup className="temp-deg" onClick={toggleTemperatureUnit}>
          {isCelsius ? "°C" : "°F"} | {isCelsius ? "°F" : "°C"}
        </sup>
      </div>
      <div className="weather-des">
      <p>feels like: {data.main.feels_like}</p><p className="weather-des">
      {data.weather[0].description}
      </p></div>
      <div className="weather-info">
        <div className="col">
          <ReactAnimatedWeather icon="WIND" size={40}/>
          <div>
            <p className="wind">
            {data.wind.speed} 
            m/s</p>
            <p>Wind speed</p>
          </div>
        </div>
        <div className="col">
          <ReactAnimatedWeather icon="RAIN" size={40}/>
          <div>
            <p className="humidity">
            {data.main.humidity}
            %</p>
            <p>Humidity</p>
        </div>
        </div>
      </div>
    </div>
  </>);
  }
  
      

export default Forecast;