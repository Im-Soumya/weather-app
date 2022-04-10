import React from "react";
import './App.css';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GetForecast from "./components/GetForecast";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#282c34"
    },
    warning: {
      main: "#0077b6"
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <GetForecast />
      </div>
    </ThemeProvider>
  );
}

export default App;
