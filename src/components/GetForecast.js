import React, { useState, useEffect } from "react";
import Details from "./Details";
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import FmdGoodIcon from '@mui/icons-material/FmdGood';

const GetForecast = () => {
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState({})

  useEffect(() => {
    getCurrentLocationWeather();
  }, [])

  const getWeatherCondition = (e) => {
    e.preventDefault()
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
    fetch(URL)
      .then(res => res.json())
      .then(res => {
        setWeather(res)
      })
  }

  const getCurrentLocationWeather = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
      fetch(URL)
        .then(res => res.json())
        .then(res => {
          setWeather(res)
        })
    })
  }

  return (
    <div>
      <div className="app_bar">
        <form onSubmit={getWeatherCondition}>
          <Box sx={{display: "flex", alignItems: "flex-end"}}>
            <SearchIcon sx={{color: "action.active", mr: 1, my: 0.5}}/>
            <TextField
              sx={{
                width: "350px"
              }}
              fullWidth
              variant="standard"
              color="warning"
              label="Search any location"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Box>
        </form> 
        <Button
          sx={{
            marginLeft: 2,
            marginBottom: 0,
          }}
          variant="outlined"
          color="secondary"
          onClick={getCurrentLocationWeather}
        >
          <FmdGoodIcon 
            sx={{
              py: 1
            }}
            fontSize="medium"
          />
        </Button>
      </div>
      <Details weather={weather} />
    </div>
  )
}

export default GetForecast;