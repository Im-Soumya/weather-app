import React from "react";
import Typography from "@mui/material/Typography";

const Details = ({ weather }) => {
  return (
    <div>
      {typeof weather.main !== "undefined" ? (
        <div>
          <Typography
            variant="h6"
            color="textSecondary"
          >
            {weather.name}
          </Typography>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Typography variant="h2">{Math.round(weather.main.temp)}</Typography>
            <Typography variant="h6"> °C</Typography>
          </div>
          <Typography variant="h6" color="textSecondary">Feels like {Math.round(weather.main.feels_like)} °C</Typography>
          <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
            <Typography variant="h5">{`${weather.weather[0].description[0].toUpperCase()}${weather.weather[0].description.slice(1)}`}</Typography>
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <div>
              <Typography variant="h6" color="textSecondary">Humidity</Typography>
              <Typography variant="h6">{weather.main.humidity}%</Typography>
            </div>
            <div>
              <Typography variant="h6"  color="textSecondary">Day ↑</Typography>
              <Typography variant="h6">{Math.round(weather.main.temp_max)} °C</Typography>
            </div>
            <div>
              <Typography variant="h6"  color="textSecondary">Night ↓</Typography>
              <Typography variant="h6">{Math.round(weather.main.temp_min)} °C</Typography>
            </div>
          </div>
        </div>
      ) : ('')}
    </div>
  )
}

export default Details;