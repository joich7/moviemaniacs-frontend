import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComp from "./components/NavbarComp";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./components/MovieCard";
import MovieCard2 from "./components/MovieCard2";
import Movie from "./pages/Movie";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
  Route,
  Routes,
} from "react-router-dom";
import Homepage from "./components/Homepage";
import MovieSearch from "./components/MovieSearch";

const API_URL = "https://www.omdbapi.com/?apikey=785850a5";
function App() {
  const [movies, setmovies] = useState([]);
  const [searchInput, setsearchInput] = useState("");

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
    imdbVotes: "695,656",
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
    // 👇️ navigate to /contacts
    navigate("/movieSearch");
  };
  const navigateToMovie = () => {
    // 👇️ navigate to /contacts
    navigate("/movie");
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
      </Routes>
    </>
  );
}

export default App;

/* <div className="container">
  {movies?.length > 0 ? (
    <div className="row">
    {movies.map((movie) => (
      <MovieCard movie={movie} movieInfo={movieInfo} />
      ))}
      </div>
      ) : (
        <div className="empty">
        <h2>No movies found</h2>
        </div>
        )}
        </div> */

// <div>
//   <NavbarComp searchMovies={searchMovies} />
//   <Movie selectedMovie={selectedMovie} />

// </div>
