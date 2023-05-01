import React, { useRef } from "react";
import { useGlobalState } from "../context/GlobalState";
import request from "../services/api.request";
import { useEffect, useState } from "react";
import { MDBContainer } from "mdb-react-ui-kit";

import Button from "react-bootstrap/esm/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import From from "react-bootstrap/Form";

import "./movie.css";
export default function Movie() {
  const [selectedMovie, setselectedMovie] = useState("");
  const [state, dispatch] = useGlobalState();
  const [showVid, setshowVid] = useState(false);
  let loggedIn = state.currentUser != null ? true : false;
  const [ytKey, setytKey] = useState("");
  const poster = "https://image.tmdb.org/t/p/w500" + selectedMovie.poster_path;
  const backdrop =
    "https://image.tmdb.org/t/p/w1920_and_h1080_multi_faces/" +
    selectedMovie.backdrop_path;

  const [headline, setheadline] = useState();
  const [textbox, settextbox] = useState();
  const [rating, setrating] = useState();
  const [reviews, setreviews] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [profile, setProfile] = useState("");
  const [videos, setvideos] = useState([]);

  const getVideos = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${localStorage.getItem(
        "selectedMovie"
      )}/videos?api_key=cc82a5951ecd8040e6f972d97c93b79c&language=en-US`
    );
    const data = await response.json();
    setvideos(data.results);
    setytKey(data.results[0].key);
  };

  async function getReviews() {
    //get playlists so I can use Id's
    let options = {
      url: `reviews/?movie=${localStorage.getItem("selectedMovie")}`, // just the endpoint
      method: "GET", // sets the method
    };
    let resp = await request(options); // await the response and pass in this fancy object of request options
    setreviews(resp.data); // set the response
    console.log(resp.data);
  }

  useEffect(() => {
    const movieInfo = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${localStorage.getItem(
          "selectedMovie"
        )}?api_key=cc82a5951ecd8040e6f972d97c93b79c&language=en-US`
      );
      const data = await response.json();
      setselectedMovie(data);

      console.log(reviews);
    };

    async function getPlaylists() {
      //get playlists so I can use Id's
      let options = {
        url: `playlists/`, // just the endpoint
        method: "GET", // sets the method
      };
      let resp = await request(options); // await the response and pass in this fancy object of request options
      setPlaylists(resp.data); // set the response
    }
    async function getUserInfo() {
      let options = {
        url: `users/${state.currentUser.user_id}/`, // just the endpoint
        method: "GET", // sets the method
      };
      let resp = await request(options); // await the response and pass in this fancy object of request options
      setProfile(resp.data); // set the response
    }
    getUserInfo();
    movieInfo();
    getVideos();
    if (loggedIn) {
      getPlaylists();
    }
    getReviews();
  }, []);

  async function postMovie(playlistID) {
    let options = {
      url: `movies/`, // just the endpoint
      method: "POST", // sets the method
      data: {
        playlist: playlistID,
        movie_id: selectedMovie.id,
        movie_name: selectedMovie.original_title,
        poster: selectedMovie.poster_path,
      },
    };
    let resp = await request(options); // await the response and pass in this fancy object of request options
    console.log(resp.data); // set the response
  }

  async function postReview() {
    let options = {
      url: `reviews/`, // just the endpoint
      method: "POST", // sets the method
      data: {
        user: state.currentUser.user_id,
        movie: selectedMovie.id,
        headline: headline,
        movie_rating: rating,
        description: textbox,
        username: profile.username,
      },
    };
    let resp = await request(options); // await the response and pass in this fancy object of request options
    console.log(resp.data); // set the response
    getReviews();
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
      id="bdImg"
      style={{
        backgroundImage: `url(${backdrop})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        backgroundBlendMode: "multiply",
      }}
    >
      <div className="p-3 m-3"></div>
      <div className="container text-white">
        <Row>
          <Col sm={12}>
            <h1>{selectedMovie.original_title}</h1>
            <div></div>
          </Col>
          <Col sm={12}>
            <Row>
              <Col sm={6}>
                <h3>RATING: {selectedMovie.vote_average}/10</h3>
              </Col>
              <Col sm={6}>
                <p>Release Date: {selectedMovie.release_date}</p>
                <p>Runtime: {selectedMovie.runtime}min</p>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col>
            <img className={"rounded"} src={poster} alt="" />
          </Col>
          <Col>
            <Row>
              <Col sm={12} className="m-4 d-flex justify-content-around">
                <Button
                  className="btn-primary"
                  onClick={() => addtoFavoriteslist()}
                >
                  +Favorites
                </Button>
                <Button onClick={() => addtoWatchlist()}>+Watchlist</Button>
                <DropdownButton
                  as={ButtonGroup}
                  title={"Playlists"}
                  id="bg-nested-dropdown"
                >
                  {playlists.map((playlist) => (
                    <Dropdown.Item onClick={() => postMovie(playlist.id)}>
                      {playlist.title}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </Col>
              <Col sm={12}>
                <p>{selectedMovie.overview}</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>{" "}
      <div className="p-3"></div>
      {showVid ? (
        <MDBContainer>
          <div className="ratio ratio-16x9">
            <iframe
              src={`https://www.youtube.com/embed/${ytKey}`}
              title="Youtube video"
              allowFullScreen
            ></iframe>
          </div>
        </MDBContainer>
      ) : null}
      <div className="p-4"></div>
      <div className="container">
        <Row>
          <Col className="d-flex justify-content-center">
            <span>
              <Button onClick={() => setshowVid(!showVid)}>View Trailer</Button>
            </span>
          </Col>
          <Col className="d-flex justify-content-center">
            <DropdownButton title={"Trailer Options"}>
              {videos.map((video) => (
                <Dropdown.Item onClick={() => setytKey(video.key)}>
                  {video.name}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Col>
        </Row>
      </div>
      <div className="p-3"></div>
      {loggedIn ? (
        <div className="container">
          <div className="m-3 d-flex justify-content-center">
            <h2>WRITE A REVIEW</h2>
          </div>
          <Row className="gy-2 gx-3 align-items-center">
            <Col>
              <Row>
                <Col>
                  <label className="visually-hidden" htmlFor="headline">
                    Headline
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Headline"
                    placeholder="Headline"
                    onChange={(e) => setheadline(e.target.value)}
                  />
                </Col>
                <Col>
                  <label className="visually-hidden" htmlFor="autoSizingSelect">
                    Preference
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="rating"
                    placeholder="Rating 1-10"
                    onChange={(e) => setrating(e.target.value)}
                  />
                </Col>

                <div className="m-2"></div>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    id="reviewText"
                    rows={4}
                    placeholder="Write Your Review Here"
                    defaultValue={""}
                    onChange={(e) => settextbox(e.target.value)}
                  />
                </div>
                <div className="m-2"></div>
                <Button
                  className="btn btn-primary"
                  onClick={() => postReview()}
                >
                  Submit
                </Button>
              </Row>
            </Col>
          </Row>
        </div>
      ) : null}
      <div className="p-5"></div>
      <Container>
        <div className="m-3 d-flex justify-content-center">
          <h2>REVIEWS</h2>
        </div>
        <Row>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>hello</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    By:{review.username}
                  </Card.Subtitle>
                  <Card.Text>{review.description}</Card.Text>
                </Card.Body>
              </Card>
            ))
          ) : (
            <div className="d-flex justify-content-center">
              <h3>No Reviews Yet</h3>
            </div>
          )}
        </Row>
      </Container>
      <div className="p-5"></div>
    </div>
  );
}
