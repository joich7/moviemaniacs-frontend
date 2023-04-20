import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import "./App.css";

const API_URL = "https://www.omdbapi.com/?apikey=785850a5";

function App() {
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    console.log(data);
  };
  useEffect(() => {
    searchMovies("Iron man");
  }, []);
  return <div className="App">
    
    <h1>Movie Mayhem</h1>
    
  </div>;
}

export default App;

//title.replaceAll(" ", "")
