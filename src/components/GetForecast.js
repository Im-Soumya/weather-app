import React, { useState, useEffect } from "react";
import Details from "./Details";
import Image from "./Image";
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import CircularProgress from '@mui/material/CircularProgress';
import { Alert, IconButton, Collapse } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const GetForecast = () => {
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    getCurrentLocationWeather();
  }, [])

  const getWeatherCondition = (e) => {
    e.preventDefault()
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
    setIsLoading(true)
    fetch(URL)
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error(res.statusText)
        }
      })
      .then(res => setWeather(res))
      .then(() => setCity("")).then(() => setIsLoading(false))
      .catch(error => {
        setError(error.message)
        console.log(error.message)
      })
  }

  const getCurrentLocationWeather = () => {
    setIsLoading(true)
    navigator.geolocation.getCurrentPosition((position) => {
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
      fetch(URL)
        .then(res => res.json())
        .then(res => setWeather(res))
        .then(() => setIsLoading(false))
    })
  }

  return (
    <div>
      {error && (
        <Box sx={{ width: "100%" }}>
          <Collapse in={isOpen}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  size="small"
                  onClick={() => {
                    setIsOpen(false)
                    setError(null)
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {error}
            </Alert>
          </Collapse>
        </Box>
      )}

      <form noValidate onSubmit={getWeatherCondition}>
        <Box sx={{ display: "flex", alignItems: "flex-end", marginTop: "20px", marginBottom: "40px", mx: "20px" }}>
          <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            fullWidth
            variant="standard"
            color="warning"
            label="Search any location"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
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
        </Box>
      </form>

      {isLoading ? (
        <Box size={20} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <CircularProgress color="secondary" />
        </Box>
      ) : (
        <>
          <Details weather={weather} />
          {/* <Image weather={weather} /> */}
        </>
      )
      }
    </div >
  )
}

export default GetForecast;