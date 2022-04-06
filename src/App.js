import React, { useState, useEffect } from "react";
import './App.css';

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude)
      console.log(position.coords.longitude)
    })
  }, [])

  return (
    <div className="App">
      <h1>Hello</h1>
    </div>
  );
}

export default App;
