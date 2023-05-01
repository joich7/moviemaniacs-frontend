import React from "react";
import { useNavigate } from "react-router-dom";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();

  const navigateToMovie = () => {
    localStorage.setItem(
      "selectedMovie",
      document.URL.includes("profile") ? movie.movie_id : movie.id
    );
    navigate("/movie");
  };

  const Poster = `https://image.tmdb.org/t/p/w500/${
    document.URL.includes("profile") ? movie.poster : movie.poster_path
  }`;

  return (
    <div
      className={
        document.URL.includes("profile") | document.URL.includes("home")
          ? null
          : "movie col-3"
      }
      onClick={navigateToMovie}
    >
      {!document.URL.includes("home") ? (
        <div>
          <p>{movie.release_date}</p>
        </div>
      ) : null}
      <div>
        <img
          className="rounded"
          src={
            movie.poster_path !== null
              ? Poster
              : "https://media.tenor.com/lx2WSGRk8bcAAAAC/pulp-fiction-john-travolta.gif"
          }
          alt={movie.Title}
        />
      </div>
      {document.URL.includes("profile") |
      document.URL.includes("home") ? null : (
        <div>
          <span>{movie.Type}</span>

          <h3>{movie.original_title}</h3>
        </div>
      )}
    </div>
  );
}
