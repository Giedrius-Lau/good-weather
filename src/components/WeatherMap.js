import React from "react";
import PropTypes from "prop-types";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import convertKelvinToCelsius from '../helpers'


const WeatherMap = ({ map, weather }) => {
  const icon = L.divIcon({
    html: `<div class="weather-marker">${convertKelvinToCelsius(weather.temperature)}°C</div>`
  });

  return (
    <div>
      <Map
        center={map.center}
        zoom={13}
        style={{ height: "250px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href=&quot ;http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {weather.temperature && (
          <Marker position={map.center} icon={icon}>
            <Popup>
              <p>
                Temperature: {convertKelvinToCelsius(weather.temperature)}°C
              </p>
              <p>
                Max temperature: {convertKelvinToCelsius(weather.temperature_max)}°C
              </p>
              <p>
                Min temperature: {convertKelvinToCelsius(weather.temperature_min)}°C
              </p>
              <p>
                Pressure: {weather.pressure}
              </p>
              <p>
                Humidity: {weather.humidity}%
              </p>
            </Popup>
          </Marker>
        )}
      </Map>
    </div>
  );
};

WeatherMap.propTypes = {
  map: PropTypes.object,
  weather: PropTypes.object,
};

export default WeatherMap;
