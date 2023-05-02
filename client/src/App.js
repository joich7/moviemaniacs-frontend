import { useState } from "react";

import NavbarComp from "./components/NavbarComp";
//import "./App.css";
import Movie from "./pages/Movie";
import { useNavigate, Route, Routes } from "react-router-dom";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import Homepage from "./pages/Homepage";
import SearchResults from "./pages/SearchResults";
import Profile from "./pages/user/Profile";
import AllFavorites from "./pages/AllFavorites";
import { Navigate } from "react-router-dom";
import PlaylistPage from "./pages/PlaylistPage";

//const API_URL2 = "https://www.omdbapi.com/?apikey=785850a5";
//const API_URL =
//  "https://8000-joich7-moviemaniacs-lewahc4c4bx.ws-us95.gitpod.io/sendjson/";
const API_URL =
  "https://api.themoviedb.org/3/search/movie?api_key=cc82a5951ecd8040e6f972d97c93b79c";

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
    navigate("/home");
  };
  const navigateToPlaylistPage = () => {
    navigate("/playlistPage");
  };

  // useEffect(() => {
  //   const data = localStorage.getItem("selectedMovie");
  //   if (!data) {
  //     localStorage.setItem("selectedMovie", "");
  //   }
  // }, []);
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&query=${title}&language=en-US`);
    const data = await response.json();
    setmovies(data.results);
    console.log(data.results);
    navigateToSearchPg();
  };

  return (
    <>
      <NavbarComp searchMovies={searchMovies} />

      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Homepage movies={movies} />} />
        <Route
          path="/movieSearch"
          element={<SearchResults movies={movies} />}
        />
        <Route
          path="/movie"
          element={<Movie selectedMovie={selectedMovie} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login login={navigateToLogin} />} />
        <Route
          path="/profile"
          element={<Profile navigateToHome={navigateToHome} />}
        />
        <Route path="/playlistPage" element={<PlaylistPage />} />
        <Route path="/allFavorites" element={<AllFavorites />} />
      </Routes>
    </>
  );
}

export default App;
