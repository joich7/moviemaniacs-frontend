import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComp from "./components/NavbarComp";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./components/MovieCard";
import MovieCard2 from "./components/MovieCard2";

const API_URL = "https://www.omdbapi.com/?apikey=785850a5";
function App() {
  const [movies, setmovies] = useState([]);
  const [searchInput, setsearchInput] = useState("");
  const [selectedMovie, setSelectedMovie] = useState([]);
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setmovies(data.Search);
    console.log(data.Search);
  };
  const movieInfo = async (imdbID) => {
    const response = await fetch(`${API_URL}&i=${imdbID}`);
    const data = await response.json();
    setSelectedMovie(data);
    console.log(data);
  };
  useEffect(() => {
    searchMovies("Iron Man"); //on load defalt call
  }, []);
  return (
    <div>
      <NavbarComp searchMovies={searchMovies} />
      <div className="container">
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
      </div>
    </div>
  );
}

export default App;

//title.replaceAll(" ", "")
