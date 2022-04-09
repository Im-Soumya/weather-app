import React from "react";
import './App.css';
import Container from "@mui/material/Container";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import GetForecast from "./components/GetForecast";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#282c34"
    },
    warning: {
      main: "#0077b6"
    }
  },
  typography: {
    fontFamily: "Montserrat",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container className="App">
        <GetForecast />
      </Container>
    </ThemeProvider>
  );
}

export default App;
