import React, { useState, useEffect, Fragment } from "react";

let city = "Chicago";

//create functional component
const Weather = () => {
  const [weather, setWeather] = useState([]);

  const getWeather = async () => {
    /*get request requires city and API Key. 
        Set variable for current API Key */

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
      <div className="container">
        <div className="weather main-info">
          <>
            <div>{city}</div>
            {weather.weather && (
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="Weather Icon"
              />
            )}
            {weather.weather && <div>{weather.weather[0].description}</div>}
            {weather.main && <h3>{weather.main.temp}</h3>}
          </>
        </div>

        <div className="weather secondary-info">
          <>
            {weather.main && <div>Feels Like: {weather.main.feels_like}</div>}
            {weather.main && <div>Humidity: {weather.main.humidity}</div>}
            {weather.wind && <div>Wind Speed: {weather.wind.speed}</div>}
          </>
        </div>
      </div>
    </>
  );
};

export default Weather;
