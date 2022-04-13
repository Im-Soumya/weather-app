import React, { useState, useEffect } from "react";
import Details from "./Details";
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import CircularProgress from '@mui/material/CircularProgress';
import { IconButton, AppBar, Toolbar, Typography, InputBase, Snackbar } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CloudIcon from '@mui/icons-material/Cloud';
import { styled, alpha } from '@mui/material/styles';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    marginLeft: theme.spacing(6),
    marginRight: theme.spacing(5),
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

const StyledBox = styled(Box)`
  ${({ theme }) =>
    ` cursor: pointer;
    border: 2px solid #E9A6A6;
    color: #E9A6A6;
    margin-left: 15px;
    border-radius: 50%;
    padding: 0 2px;
    transition: ${theme.transitions.create(['background-color'], {
      duration: theme.transitions.duration.standard,
    })};
    &:hover {
      background-color: #E9A6A6;
      color: #3F3351;
    }`
  }
`;


const GetForecast = () => {
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [state, setState] = React.useState({
    isOpen: true,
    vertical: 'bottom',
    horizontal: 'left',
  });

  const { vertical, horizontal, isOpen } = state;

  const handleClose = () => {
    setState({ ...state, isOpen: false });
    setError(false)
  };

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
        .catch((e) => {
          setError(e.message)
          console.log(e.message)
        })
    })
  }

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  )

  return (
    <div>
      {error && (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          autoHideDuration={6000}
          open={isOpen}
          onClose={handleClose}
          message={error}
          key={vertical + horizontal}
          action={action}
        />
      )}

      <Box>
        <AppBar
          sx={{ backgroundColor: "#2c2a4a" }}
        >
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
              sx={{ flexGrow: 1, marginLeft: "175px", display: { xs: "none", sm: "inline-block" } }}
            >
              The Weather
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
            <StyledBox
              onClick={getCurrentLocationWeather}
            >
              <FmdGoodIcon
                sx={{
                  p: 0.7,
                  marginTop: "1px"
                }}
                fontSize="medium"
              />
            </StyledBox>
          </Toolbar>
        </AppBar>
      </Box>

      {isLoading ? (
        <Box size={20} sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "150px" }}>
          <CircularProgress color="secondary" />
        </Box>
      ) : (
        <>
          <div className="toolbar_gap"></div>
          <Details weather={weather} />
          {/* <Image weather={weather} /> */}
        </>
      )
      }
    </div >
  )
}

export default GetForecast;