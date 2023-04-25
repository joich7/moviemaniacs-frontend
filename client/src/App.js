import { useEffect, useState } from "react";

import NavbarComp from "./components/NavbarComp";
import "./App.css";
import Movie from "./pages/Movie";
import { useNavigate, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import SearchResults from "./components/SearchResults";
import Login from "./pages/Login";

//const API_URL = "https://www.omdbapi.com/?apikey=785850a5";
//const API_URL =
//  "https://8000-joich7-moviemaniacs-lewahc4c4bx.ws-us95.gitpod.io/sendjson/";
const API_URL =
  "https://api.themoviedb.org/3/search/movie?api_key=cc82a5951ecd8040e6f972d97c93b79c";

function App() {
  const [movies, setmovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({
    Title: "Guardians of the Galaxy Vol. 2",
    Year: "2017",
    Rated: "PG-13",
    Released: "05 May 2017",
    Runtime: "136 min",
    Genre: "Action, Adventure, Comedy",
    Director: "James Gunn",
    Writer: "James Gunn, Dan Abnett, Andy Lanning",
    Actors: "Chris Pratt, Zoe Saldana, Dave Bautista",
    Plot: "The Guardians struggle to keep together as a team while dealing with their personal family issues, notably Star-Lord's encounter with his father the ambitious celestial being Ego.",
    Language: "English",
    Country: "United States",
    Awards: "Nominated for 1 Oscar. 15 wins & 60 nominations total",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg",
    Ratings: [
      { Source: "Internet Movie Database", Value: "7.6/10" },
      { Source: "Rotten Tomatoes", Value: "85%" },
      { Source: "Metacritic", Value: "67/100" },
    ],
    Metascore: "67",
    imdbRating: "7.6",
    imdbVotes: "699,402",
    imdbID: "tt3896198",
    Type: "movie",
    DVD: "22 Aug 2017",
    BoxOffice: "$389,813,101",
    Production: "N/A",
    Website: "N/A",
    Response: "True",
  });

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
    const response = await fetch(`${API_URL}&query=${title}`);
    const data = await response.json();
    setmovies(data.results);
    console.log(data.results);
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
          element={<SearchResults movies={movies} movieInfo={movieInfo} />}
        />
        <Route
          path="/movie"
          element={<Movie selectedMovie={selectedMovie} />}
        />
        <Route path="/login" element={<Login login={navigateToLogin} />} />
      </Routes>
    </>
  );
}

export default App;
