import React from "react";

export default function MovieCard2({ movie }) {
  return (
    <div className="col-3">
      <div className="card">
        <img
          className="card-img-top"
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/"
          }
          alt={movie.Title}
        />
        <div className="card-body">
          <span>{movie.Type}</span>
          <p className="card-text">{movie.Title}</p>
        </div>
      </div>
    </div>
  );
}
