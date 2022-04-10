import React, { useState, useEffect } from "react";
import Details from "./Details";
import Image from "./Image";
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import CircularProgress from '@mui/material/CircularProgress';
import { Alert, IconButton, Collapse, AppBar, Toolbar, Typography, InputBase } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CloudIcon from '@mui/icons-material/Cloud';
import { styled, alpha } from '@mui/material/styles';
import { AddBoxTwoTone } from "@mui/icons-material";

const commonStyles = {
  bgColor: "background.paper",
  m: 1,
  border: 1,
  width: "2.5rem",
  height: "2.5rem",
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

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

      <Box>
        <AppBar>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
            >
              <CloudIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              the.weather
            </Typography>
            <form onSubmit={getWeatherCondition}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Search"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </form>
            <Box
              sx={{
                ...commonStyles,
                borderColor: "#ffffff",
                marginLeft: 4,
                borderRadius: "50%",
                cursor: "pointer",
              }}

              onClick={getCurrentLocationWeather}
            >
              <FmdGoodIcon
                sx={{
                  p: 1
                }}
                fontSize="medium"
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

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