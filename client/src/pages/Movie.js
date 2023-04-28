import React from "react";
import { useGlobalState } from "../context/GlobalState";
import request from "../services/api.request";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";

export default function Movie({ selectedMovie }) {
  const [state, dispatch] = useGlobalState();
  let loggedIn = state.currentUser != null ? true : false;
  const imgPath = "https://image.tmdb.org/t/p/w500";
  const poster = imgPath + selectedMovie.poster_path;
  const backdrop = imgPath + selectedMovie.backdrop_path;

  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    async function getPlaylists() {
      //get playlists so I can use Id's
      let options = {
        url: `playlists/`, // just the endpoint
        method: "GET", // sets the method
      };
      let resp = await request(options); // await the response and pass in this fancy object of request options
      setPlaylists(resp.data); // set the response
    }
    getPlaylists();
  }, []);

  async function postMovie(playlistID) {
    let options = {
      url: `movies/`, // just the endpoint
      method: "POST", // sets the method
      data: {
        playlist: playlistID,
        movie_id: selectedMovie.id,
        movie_name: selectedMovie.original_title,
      },
    };
    let resp = await request(options); // await the response and pass in this fancy object of request options
    console.log(resp.data); // set the response
  }

  function addtoWatchlist() {
    let watchlistID = 0;
    for (let i of playlists) {
      if (i.list_type === "w") {
        watchlistID = i.id;
      }
    }
    postMovie(watchlistID);
  }

  function addtoFavoriteslist() {
    let favlistID = 0;
    for (let i of playlists) {
      if (i.list_type === "f") {
        favlistID = i.id;
      }
    }
    postMovie(favlistID);
  }

  return (
    <div
      style={{
        backgroundImage: `url(${backdrop}); height:100vp`,
      }}
    >
      <div className="p-3 m-3"></div>
      <div className="container ">
        <div className="row">
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
            <Button onClick={() => addtoFavoriteslist()}>+Favorites</Button>
            <Button onClick={() => addtoWatchlist()}>+Watchlist</Button>
          </div>
        </div>
        <div className="row ">
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
