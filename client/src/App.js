import { useEffect, useState } from "react";

import NavbarComp from "./components/NavbarComp";
import "./App.css";
import Movie from "./pages/Movie";
import { useNavigate, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import MovieSearch from "./components/MovieSearch";

import Login from "./pages/Login";

//const API_URL = "https://www.omdbapi.com/?apikey=785850a5";
const API_URL =
  "https://8000-joich7-moviemaniacs-lewahc4c4bx.ws-us95.gitpod.io/sendjson/";
function App() {
  const [movies, setmovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");

  const navigate = useNavigate();

  const navigateToSearchPg = () => {
    navigate("/movieSearch");
  };
  const navigateToMovie = () => {
    navigate("/movie");
  };
  const navigateToLogin = () => {
    navigate("/login");
  };
  const navigateToHome = () => {
    navigate("/");
  };

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setmovies(data.Search);
    console.log(data.Search);
    navigateToSearchPg();
  };
  const movieInfo = async (imdbID) => {
    const response = await fetch(`${API_URL}&i=${imdbID}`);
    const data = await response.json();
    setSelectedMovie(data);
    console.log(data);
    navigateToMovie();
  };

  return (
    <>
      <NavbarComp searchMovies={searchMovies} />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/movieSearch"
          element={<MovieSearch movies={movies} movieInfo={movieInfo} />}
        />
        <Route
          path="/movie"
          element={<Movie selectedMovie={selectedMovie} />}
        />
        <Route path="login/" element={<Login login={navigateToLogin} />} />
      </Routes>
    </>
  );
}

export default App;
