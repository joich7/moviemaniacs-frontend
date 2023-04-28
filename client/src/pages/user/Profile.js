import React from "react";
import { useGlobalState } from "../../context/GlobalState";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import request from "../../services/api.request";
import CustomToggle from "../../components/CustomToggle";
import { MDBAccordion, MDBAccordionItem } from "mdb-react-ui-kit";
const Profile = ({ movieInfo }) => {
  const [state, dispatch] = useGlobalState();
  const [profile, setProfile] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [playlistText, setPlaylistText] = useState("");

  let loggedIn = state.currentUser != null ? true : false;
  console.log(state.currentUser.user_id);

  async function updatePlaylists() {
    let options = {
      url: `playlists/`, // just the endpoint
      method: "GET", // sets the method
    };
    let resp = await request(options); // await the response and pass in this fancy object of request options
    setPlaylists(resp.data); // set the response
  }

  useEffect(() => {
    async function getUserInfo() {
      let options = {
        url: `users/${state.currentUser.user_id}/`, // just the endpoint
        method: "GET", // sets the method
      };
      let resp = await request(options); // await the response and pass in this fancy object of request options
      setProfile(resp.data); // set the response
    }

    getUserInfo();
    updatePlaylists();
    for (var i of playlists) {
      if (i.list_type === "w") {
        dispatch({ watchlistId: 1 });
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
    updatePlaylists();
  }
  async function deletePlaylist(playlistID) {
    let options = {
      url: `playlists/${playlistID}`, // just the endpoint
      method: "DELETE", // sets the method
      data: { id: playlistID },
    };
    let resp = await request(options);
    console.log(resp.data);
    updatePlaylists();
  }
  async function deleteMovie(movieID) {
    let options = {
      url: `movies/${movieID}`, // just the endpoint
      method: "DELETE", // sets the method
      data: { id: movieID },
    };
    let resp = await request(options);
    console.log(resp.data);
    updatePlaylists();
  }

  return (
    <div className="container">
      <h1>{profile.username}'s profile</h1>
      {/* <Button
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
      </Button> */}
      <div className="d-flex justify-content-center p-2 m-4">
        <input
          type="text"
          id="playlistTxt"
          name="playlisTxt"
          onChange={(e) => setPlaylistText(e.target.value)}
          required
        />
        <Button
          className="btn"
          onClick={() => {
            createPlaylist();
          }}
        >
          +Playlist
        </Button>
      </div>
      <div className="row">
        <MDBAccordion initialActive={1}>
          {playlists.map((playlist) => (
            <>
              <div className="row">
                <div className="col-10">
                  <CustomToggle
                    playlist={playlist}
                    movieInfo={movieInfo}
                    deleteMovie={deleteMovie}
                  ></CustomToggle>
                </div>
                <div className="col-2">
                  <Button onClick={() => deletePlaylist(playlist.id)}>
                    Delete Playlist
                  </Button>
                </div>
              </div>
            </>
          ))}
        </MDBAccordion>
      </div>
    </div>
  );
};

export default Profile;
