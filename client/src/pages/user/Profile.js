import React from "react";
import { useGlobalState } from "../../context/GlobalState";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../services/auth.constants";
import request from "../../services/api.request";

const Profile = () => {
  const [state, dispatch] = useGlobalState();
  const [profile, setProfile] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [playlistText, setPlaylistText] = useState("");
  

  let loggedIn = state.currentUser != null ? true : false;
  console.log(state.currentUser.user_id);

  useEffect(() => {
    async function getSomeDataFromBackend() {
      let options = {
        url: `users/${state.currentUser.user_id}/`, // just the endpoint
        method: "GET", // sets the method
      };
      let resp = await request(options); // await the response and pass in this fancy object of request options
      setProfile(resp.data); // set the response
    }
    async function getPlaylists() {
      let options = {
        url: `playlists/`, // just the endpoint
        method: "GET", // sets the method
      };
      let resp = await request(options); // await the response and pass in this fancy object of request options
      setPlaylists(resp.data); // set the response
    }
    getSomeDataFromBackend();
    getPlaylists();
    for (var i of playlists) {
      if (i.list_type === "w") {
        dispatch({ watchlistId : 1 });
      } else if (i.list_type === "f") {
        dispatch({ favoritesId: 2 });
      }
    }
  }, []);

  async function createPlaylist() {
    let options = {
      url: `playlistCreate/`, // just the endpoint
      method: "POST", // sets the method
      data: { user: state.currentUser.user_id, title: playlistText, type: "c" },
    };
    let resp = await request(options);
    console.log(resp.data);
  }

  return (
    <div className="container">
      <h1>{profile.username}</h1>
      <Button
        className="btn"
        onClick={() => {
          console.log("loggedIn?" + loggedIn);
          console.log("state:");
          console.log(state);
          console.log("Profile data:");
          console.log(profile);
          console.log("playlists");
          console.log(playlists);
          console.log(state.favoritesId);
        }}
      >
        Profile data
      </Button>
      <Button
        className="btn"
        onClick={() => {
          createPlaylist();
        }}
      >
        +Playlist
      </Button>
      <Button
        className="btn"
        onClick={() => dispatch({ playlistInfo: state.playlistInfo + 1 })}
      >
        {state.playlistInfo}
      </Button>
      <input
        type="text"
        id="playlistTxt"
        name="playlisTxt"
        onChange={(e) => setPlaylistText(e.target.value)}
        required
      />
      <div className="row">
        <div className="col ">
          <div>
            {playlists.map((playlist) => (
              <li>{playlist.title}</li>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
