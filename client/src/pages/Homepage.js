import React from "react";
import MovieCard from "../components/MovieCard";

import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import "./hp.css";
import axios from "axios";
import hpbg from "../components/hpbg.png";

export default function Homepage({ movies, movieInfo }) {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);

  const backdrop =
    "https://image.tmdb.org/t/p/w500/7lmBufEG7P7Y1HClYK3gCxYrkgS.jpg";

  function getData(type, fun) {
    const API_URL = `https://api.themoviedb.org/3/${type}?api_key=cc82a5951ecd8040e6f972d97c93b79c&page=1&language=en-US&page=1`;

    axios
      .get(API_URL)
      .then(function (response) {
        // handle success
        console.log(response.data.results);
        fun(response.data.results);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }

  useEffect(() => {
    getData("movie/popular", setPopular);
    getData("trending/movie/day", setTrending);
    getData("movie/now_playing", setNowPlaying);
    //getData("trending/movie/all/week", setTrending);
  }, []);
  return (
    <>
      {/* <div className="container">
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
      </div> */}

      <header
        className="page-header"
        id="bdImg"
        style={{
          backgroundImage: `url(${hpbg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          backgroundBlendMode: "multiply",
        }}
      >
        <div className="container flow">
          <h1 className="page-title">Welcome To Movie Maniacs!</h1>
          <p className="page-subtitle">Start Browsing Now!</p>
        </div>
      </header>

      {/* ------------------------Popular----------------------------- */}
      <section>
        <div className="d-flex justify-content-between p-3">
          <h2>Popular:</h2>
          {/* <Button>View More</Button> */}
        </div>
        <div className="media-scroller snaps-inline ">
          {popular.map((movie) => (
            <MovieCard movie={movie} movieInfo={movieInfo} />
          ))}
        </div>
      </section>
      {/* ------------------------Trending----------------------------- */}
      <section>
        <div className="d-flex justify-content-between p-3">
          <h2>Trending:</h2>
          {/* <Button>View More</Button> */}
        </div>
        <div className="media-scroller snaps-inline ">
          {trending.map((movie) => (
            <MovieCard movie={movie} movieInfo={movieInfo} />
          ))}
        </div>
      </section>
      {/* ------------------------Now Playing----------------------------- */}
      <section>
        <div className="d-flex justify-content-between p-3">
          <h2>Now Playing:</h2>
          {/* <Button>View More</Button> */}
        </div>
        <div className="media-scroller snaps-inline ">
          {nowPlaying.map((movie) => (
            <MovieCard movie={movie} movieInfo={movieInfo} />
          ))}
        </div>
      </section>
    </>
  );
}
