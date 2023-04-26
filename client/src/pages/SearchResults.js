import React from "react";
import MovieCard from "../components/MovieCard";
import NavbarComp from "../components/NavbarComp";
export default function SearchResults({ movies, movieInfo }) {
  return (
    <>
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
    </>
  );
}
