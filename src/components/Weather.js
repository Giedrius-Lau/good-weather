import React, { useState, useEffect } from "react";
import WeatherMap from "./WeatherMap";
import WeatherList from "./WeatherList";

const Weather = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [currentCity, setCurrentCity] = useState("Vilnius");
  const [weateherInformation, setWeateherInformation] = useState({
    temperature: null,
    humidity: null,
    pressure: null,
    temp_max: null,
    temp_min: null,
    icon: null,
  });

  const [formData, setFormData] = useState({
    city: '',
  });

  const { city } = formData;

  useEffect(() => {
    fetchWeather();
    // eslint-disable-next-line
  }, []);

  const [map, setMap] = useState({
    center: {
      lat: 54.69,
      lng: 25.28,
    },
    zoom: 11,
  });

  const fetchWeather = async (position) => {
    if (position) {
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=155a0a7d0c51b2bea08bf894a86059c0`
      )
        .then((response) => response.json())
        .then((res) => {
          setMap({
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });

          setWeateherInformation({
            temperature: res.main.temp,
            humidity: res.main.humidity,
            pressure: res.main.pressure,
            temperature_max: res.main.temp_max,
            temperature_min: res.main.temp_min,
            icon: res.weather[0].icon,
          });
        });
    } else {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${map.center.lat}&lon=${map.center.lng}&appid=155a0a7d0c51b2bea08bf894a86059c0`
      );

      const res = await response.json();

      setWeateherInformation({
        temperature: res.main.temp,
        humidity: res.main.humidity,
        pressure: res.main.pressure,
        temperature_max: res.main.temp_max,
        temperature_min: res.main.temp_min,
        icon: res.weather[0].icon,
      });
    }
  };

  const getPosition = function () {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const getDeviceLocation = () => {
    if ("geolocation" in navigator) {
      setErrorMessage("");
      getPosition()
        .then((position) => {
          fetchWeather(position);
          setCurrentCity("your current location");
        })
        .catch((err) => {
          console.error(err.message);
        });
    } else {
      setErrorMessage("Please allow your location, for weather information.");
    }
  };

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=155a0a7d0c51b2bea08bf894a86059c0`
      );

      const res = await response.json();

      if (res.cod !== 200) {
        setFormData({city: ''});
        return setErrorMessage("Please enter valid city name");
      }

      setErrorMessage("");

      setMap({
        center: {
          lat: res.coord.lat,
          lng: res.coord.lon,
        },
      });

      setWeateherInformation({
        temperature: res.main.temp,
        humidity: res.main.humidity,
        pressure: res.main.pressure,
        temperature_max: res.main.temp_max,
        temperature_min: res.main.temp_min,
        icon: res.weather[0].icon,
      });

      setCurrentCity(city)
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="container">
      <WeatherMap map={map} weather={weateherInformation}></WeatherMap>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="container__section container__section--flex text-center">
        <form onSubmit={e => onSubmit(e)}>
          <input
            className="form-control"
            placeholder="Search for city"
            value={city}
            name='city'
            onChange={e => onChange(e)}

          />
          <button type="submit">Search</button>
        </form>
      </div>
      <WeatherList
        weather={weateherInformation}
        currentCity={currentCity}
      ></WeatherList>
      <div className="container__section text-center">
        <button onClick={() => getDeviceLocation()}>
          Get weather by location
        </button>
      </div>
    </div>
  );
};

export default Weather;
