import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const Details = ({ weather }) => {
  return (
    <Container>
      {typeof weather.main !== "undefined" ? (
        <div>
          <Typography
            variant="h6"
            color="#C4B6B6"
          >
            {weather.name}
          </Typography>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Typography
              variant="h2"
              color="#ECDBBA"
            >{Math.round(weather.main.temp)}</Typography>
            <Typography variant="h6" color="#ECDBBA"> °C</Typography>
          </div>
          <Typography sx={{ fontSize: "14px" }} variant="h6" color="#C4B6B6">Feels like {Math.round(weather.main.feels_like)} °C</Typography>
          <div className="weather_description">
            <Typography variant="h5" color="#EEEEEE" sx={{ fontSize: "17px", paddingRight: "40px" }}>{`${weather.weather[0].description[0].toUpperCase()}${weather.weather[0].description.slice(1)}`}</Typography>
            <img
              className="weather_icon"
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather-icon"
            />
          </div>
          <div className="details_box">
            <div>
              <Typography sx={{ fontSize: "15px" }} variant="h6" color="#7E7474">Humidity</Typography>
              <Typography sx={{ fontSize: "15px" }} variant="h6" color="#EEEEEE">{weather.main.humidity}%</Typography>
            </div>
            <div>
              <Typography sx={{ fontSize: "15px" }} variant="h6" color="#7E7474">Day ↑</Typography>
              <Typography sx={{ fontSize: "15px" }} variant="h6" color="#EEEEEE">{Math.round(weather.main.temp_max)} °C</Typography>
            </div>
            <div>
              <Typography sx={{ fontSize: "15px" }} variant="h6" color="#7E7474">Night ↓</Typography>
              <Typography sx={{ fontSize: "15px" }} variant="h6" color="#EEEEEE">{Math.round(weather.main.temp_min)} °C</Typography>
            </div>
          </div>
        </div>
      ) : ('')}
    </Container>
  )
}

export default Details;