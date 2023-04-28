import React from "react";
import { useEffect, useState } from "react";
import request from "../services/api.request";

export default function ProfilePage() {
  const [movies, setMovies] = useState([]);

  async function playlistInfo() {
    let options = {
      url: `movies/`, // just the endpoint
      method: "GET", // sets the method
    };
    let resp = await request(options); // await the response and pass in this fancy object of request options
    setMovies(resp.data); // set the response
  }

  return (
    <div>
      {movies.map((playlist) => (
        <li>{playlist.title}</li>
      ))}
    </div>
  );
}
