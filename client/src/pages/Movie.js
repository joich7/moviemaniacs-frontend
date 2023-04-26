import React from "react";
import { useGlobalState } from "../context/GlobalState";

export default function Movie({ selectedMovie }) {
  const [state, dispatch] = useGlobalState();
  let loggedIn = state.currentUser != null ? true : false;
  const imgPath = "https://image.tmdb.org/t/p/w500";
  const poster = imgPath + selectedMovie.poster_path;
  const backdrop = imgPath + selectedMovie.backdrop_path;
  return (
    <div
      style={{
        backgroundImage:
          `url(${backdrop}); height:100vp`,
      }}
    >
   
        <div className="container ">
          <div className="row bg-white">
            <div className="col">
              <h1>{selectedMovie.original_title}</h1>
              <div className="row">
                <div className="col">
                  <p>
                    {selectedMovie.release_date} &#9900;
                    {selectedMovie.runtime}min
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
                <h2>{selectedMovie.vote_average}/10</h2>
              </div>
              <button>Add to List</button>
              <button>+Watchlist</button>
            </div>
          </div>
          <div className="row bg-white">
            <div className="col">
              <img src={backdrop} alt="" />
            </div>
            <div className="col">
              <p>{selectedMovie.overview}</p>
            </div>
          </div>
        </div>
      </div>

  );
}
