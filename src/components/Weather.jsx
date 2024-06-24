import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchEngine from "./SearchEngine";
import Forecast from "./Forecast";


function Weather(currentLocation) {
  const [query, setQuery] = useState("");
  const [err , setErr] = useState("")
  const [weather, setWeather] = useState({
    loading: true,
    data: {},
    error: false
  });
  const toDate = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "Nocvember",
      "December"
    ];
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    const currentDate = new Date();
    const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
      months[currentDate.getMonth()]
    }`;
    return date;
  };
const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY
  const search = async () => {
      setQuery("");
      setWeather({ ...weather, loading: true });
       
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`
      await axios
        .get(url)
        .then((res) => {
          // console.log("res", res);
          setWeather({ data: res.data, loading: false, error: false });
          setErr('')
        })
        .catch((error) => {
          setWeather({ ...weather, data: {}, error: true });
          setQuery("");
          console.log("error", error);
        });
    
  };

  useEffect(() => {
    const fetchData = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${currentLocation.location}&units=metric&appid=${apiKey}`

      try {
        const response = await axios.get(url);
        setWeather({ data: response.data, loading: false, error: false });
      } catch (error) {
        setWeather({ data: {}, loading: false, error: true });
        console.log("error", error);
      }
    };
   if(currentLocation.error){
    setErr(currentLocation.error);
   }
    fetchData();
  }, []);

  return (
    <div className="App">
       
      {/* SearchEngine component */}
      <SearchEngine query={query} setQuery={setQuery} search={search}/>
 
      {weather.loading && (
        <>
          <br />
          <br />
          <h4>Searching..</h4>
        </>
      )}
      {err && <>
        <span className="error-message">
          <h5 style={{ color : 'red' }}>
            {err}
          </h5>
        </span>
      </>}
      {weather.error && (
        <>
          <br />
          <br />
          <span className="error-message">
            <span style={{ fontFamily: "font" }}>
              Sorry city not found, please enter city.
            </span>
          </span>
        </>
      )}

      {weather && weather.data && (
        // Forecast component
        <Forecast weather={weather} toDate={toDate} />
      )}
    </div>
  );
}

export default Weather;