import React from "react";

export default function Movie({ selectedMovie }) {
  return (
    <div className="container">
      <div className="row bg-white">
        <div className="col">
          <h1>{selectedMovie.Title}</h1>
          <div className="row">
            <div className="col">
              <p>
                {selectedMovie.Year} &#9900; {selectedMovie.Rated} &#9900;{" "}
                {selectedMovie.Runtime}
              </p>
            </div>
            <div className="col">
              <p>Genre: {selectedMovie.Genre}</p>
            </div>
          </div>
        </div>
        <div className="col d-flex justify-content-between">
          <div>
            <p>RATING</p>
            <h2>{selectedMovie.imdbRating}/10</h2>
          </div>
          <button>Add to List</button>
          <button>+Watchlist</button>
        </div>
      </div>
      <div className="row bg-white">
        <div className="col">
          <img src={selectedMovie.Poster} alt="" />
        </div>
        <div className="col">
          <p>{selectedMovie.Plot}</p>
        </div>
      </div>
    </div>
  );
}
