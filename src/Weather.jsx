import React, { useState, useEffect, Fragment } from "react";
import "./Weather.css";

let city = "Chicago";
//create functional component
const Weather = () => {
  const [weather, setWeather] = useState([]);
  const getWeather = async () => {
    //Protect API Key 
    const appid = process.env.REACT_APP_WEATHER_API_KEY;
    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&lang=en&appid=${appid}`
    );

    //return weather as json
    let weather = await res.json();
    setWeather(weather);
    console.log(weather);
  };

  useEffect(() => {
    getWeather();
    return () => {}; //empty cleanup function
  }, []);

  return (
    <>
      <div className="container ">
        <div className="weather main-info">
          <>
            <div className="city">{city.toUpperCase()}</div>
            {weather.weather && (
              <>
                <div>{weather.weather[0].description.toUpperCase()}</div>
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt="Weather Icon"
                />
              </>
            )}
            {weather.main && <div className="current-temp">{weather.main.temp} F</div>}
          </>
        </div>

        <div className="weather secondary-info">
          <>
            {weather.main && (
              <>
                <div>Feels Like: {weather.main.feels_like} F</div>
                <div>Humidity: {weather.main.humidity} %</div>
              </>
            )}
            {weather.wind && <div>Wind Speed: {weather.wind.speed} MPH</div>}
          </>
        </div>
      </div>
    </>
  );
};

export default Weather;
