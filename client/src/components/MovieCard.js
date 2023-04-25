import React from "react";

export default function MovieCard({ movie, movieInfo }) {
  const Poster = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  return (
    <div className="movie col-3" onClick={() => movieInfo(movie.imdbID)}>
      <div>
        <p>{movie.release_date}</p>
      </div>

      <div>
        <img
          src={
            movie.poster_path !== null
              ? Poster
              : "https://media.tenor.com/lx2WSGRk8bcAAAAC/pulp-fiction-john-travolta.gif"
          }
          alt={movie.Title}
        />
      </div>
      <div>
        <span>{movie.Type}</span>

        <h3>{movie.original_title}</h3>
      </div>
    </div>
  );
}
