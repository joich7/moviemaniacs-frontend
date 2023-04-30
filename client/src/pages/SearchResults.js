import React from "react";
import MovieCard from "../components/MovieCard";
import NavbarComp from "../components/NavbarComp";
import "../App.css";
export default function SearchResults({ movies, movieInfo }) {
  return (
    <>
      <div className="row">
        {movies?.length > 0 ? (
          <>
            {movies.map((movie) => (
              <MovieCard movie={movie} movieInfo={movieInfo} />
            ))}
          </>
        ) : (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )}
      </div>
    </>
  );
}
