import React from "react";
import { useGlobalState } from "../../context/GlobalState";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";

import request from "../../services/api.request";
import MovieCard from "../../components/MovieCard";
import Accordion from "react-bootstrap/Accordion";
import EditModal from "../../components/EditModal";

const Profile = () => {
  const [state, dispatch] = useGlobalState();
  const [profile, setProfile] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [playlistText, setPlaylistText] = useState("");
  const [selectedPlaylist, setselectedPlaylist] = useState("");

  const [show, setShow] = useState(false);
  const [fullscreen, setFullscreen] = useState(true);
  function handleShow(breakpoint, playVal) {
    setFullscreen(breakpoint);
    setShow(true);
    setselectedPlaylist(playVal);
  }

  const navigate = useNavigate();
  const navigateToMovie = () => {
    navigate("/movie");
  };

  let loggedIn = state.currentUser != null ? true : false;
  console.log(state.currentUser.user_id);

  async function getPlaylists() {
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
    getPlaylists();

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
    getPlaylists();
  }
  async function deletePlaylist(playlistID) {
    let options = {
      url: `playlists/${playlistID}`, // just the endpoint
      method: "DELETE", // sets the method
      data: { id: playlistID },
    };
    let resp = await request(options);
    console.log(resp.data);
    getPlaylists();
  }
  async function deleteMovie(movieID) {
    let options = {
      url: `movies/${movieID}`, // just the endpoint
      method: "DELETE", // sets the method
      data: { id: movieID },
    };
    let resp = await request(options);
    console.log(resp.data);
    getPlaylists();
  }

  return (
    <div className="container">
      <Button onClick={() => console.log(state.currentUser)}>log play</Button>
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

      {playlists.map((playlist) => (
        <section>
          <div className="d-flex justify-content-between p-3">
            <h2>{playlist.title}</h2>
            <Button
              className="me-2 mb-2"
              onClick={() => handleShow("sm-down", playlist)}
            >
              Edit
            </Button>
          </div>
          {playlists.length > 0 ? (
            <div className="media-scroller snaps-inline ">
              {playlist.movies.map((movie) => (
                <MovieCard movie={movie} />
              ))}
            </div>
          ) : (
            <div>
              <h2>No Movies in Playlist</h2>
            </div>
          )}
        </section>
      ))}
      {selectedPlaylist !== "" ? (
        <>
          <Modal
            show={show}
            fullscreen={fullscreen}
            onHide={() => setShow(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit {selectedPlaylist.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {(selectedPlaylist.list_type === "w") |
              (selectedPlaylist.list_type === "f") ? null : (
                <Button onClick={() => deletePlaylist(selectedPlaylist.id)}>
                  Delete Playlist
                </Button>
              )}
              {selectedPlaylist.movies.map((movie) => (
                <>
                  <Row>
                    <Col>
                      <a
                        onClick={() => {
                          localStorage.setItem("selectedMovie", movie.movie_id);
                          navigateToMovie();
                        }}
                      >
                        {movie.movie_name}
                      </a>
                    </Col>
                    <Col>
                      <Button onClick={() => deleteMovie(movie.id)}></Button>
                    </Col>
                  </Row>
                </>
              ))}
            </Modal.Body>
          </Modal>
        </>
      ) : null}
    </div>
  );
};

export default Profile;
