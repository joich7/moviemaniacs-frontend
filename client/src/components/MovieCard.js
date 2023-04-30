import React from "react";

export default function MovieCard({ movie, movieInfo }) {
  // if (!document.URL.includes("home")) {
  //   alert("yeet");
  // }
  const Poster = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  return (
    <div
      className={!document.URL.includes("home") ? "movie col-3" : null}
      onClick={() => movieInfo(movie.id)}
    >
      {!document.URL.includes("home") ? (
        <div>
          <p>{movie.release_date}</p>
        </div>
      ) : null}
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
      {!document.URL.includes("home") ? (
        <div>
          <span>{movie.Type}</span>

          <h3>{movie.original_title}</h3>
        </div>
      ) : null}
    </div>
  );
}
