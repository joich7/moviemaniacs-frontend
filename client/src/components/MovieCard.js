import React from "react";

export default function MovieCard({ movie, movieInfo }) {
  return (
    <div className="movie col-3" onClick={() => movieInfo(movie.imdbID)}>
      <div>
        <p>{movie.year}</p>
      </div>

      <div>
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/"
          }
          alt={movie.Title}
        />
      </div>
      <div>
        <span>{movie.Type}</span>

        <h3>{movie.Title}</h3>
      </div>
    </div>
  );
}
