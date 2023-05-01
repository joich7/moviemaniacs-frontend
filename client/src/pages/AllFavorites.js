import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import request from "../services/api.request";
import Button from "react-bootstrap/Button";
export default function AllFavorites() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    async function getPlaylists() {
      //get playlists so I can use Id's
      let options = {
        url: `favoritesPage/`, // just the endpoint
        method: "GET", // sets the method
      };
      let resp = await request(options); // await the response and pass in this fancy object of request options
      setPlaylists(resp.data); // set the response
    }
    getPlaylists();
  }, []);

  return (
    <div className="container">
      {" "}
      {playlists.map((playlist) =>
        playlist.movies.length > 0 ? (
          <section>
            <div className="d-flex justify-content-between p-3">
              <h2>{playlist.title}:</h2>
            </div>
            <div className="media-scroller snaps-inline ">
              {playlist.movies.map((movie) => (
                <MovieCard movie={movie} />
              ))}
            </div>
          </section>
        ) : null
      )}
      {/* <Button onClick={() => console.log(playlists)}></Button> */}
    </div>
  );
}
