import React from "react";
import PropTypes from "prop-types";
import convertKelvinToCelsius from "../helpers";

const WeatherList = ({ weather, currentCity }) => {
  return (
    <div className="list-view container__section">
      {currentCity && (
        <div className="city-name">
          <h2>
            Temperature in{" "}
            <span className="text-capitalize">{currentCity}</span>
          </h2>
          <img
            src={`http://openweathermap.org/img/w/${weather.icon}.png`}
            alt="weather"
          ></img>
        </div>
      )}
      <ul>
        <li>
          <span>Temperature: </span>
          <strong>{convertKelvinToCelsius(weather.temperature)}°C</strong>
        </li>
        <li>
          <span>Max temperature: </span>
          <strong>{convertKelvinToCelsius(weather.temperature_max)}°C</strong>
        </li>
        <li>
          <span>Min temperature: </span>
          <strong>{convertKelvinToCelsius(weather.temperature_min)}°C</strong>
        </li>
        <li>
          <span>Pressure: </span>
          <strong>{weather.pressure}</strong>
        </li>
        <li>
          <span>Humidity: </span>
          <strong>{weather.humidity}%</strong>
        </li>
      </ul>
    </div>
  );
};

WeatherList.propTypes = {
  weather: PropTypes.object,
  currentCity: PropTypes.string,
};

export default WeatherList;
