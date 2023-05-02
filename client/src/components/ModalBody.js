import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
export default function ModalBody({
  deleteMovie,
  currentMovie,
  navigateToMovie,
}) {
  const [show, setshow] = useState(true);

  return show ? (
    <>
      <li>
        <div className="d-flex justify-content-between mb-4">
          <a
            onClick={() => {
              localStorage.setItem("selectedMovie", currentMovie.movie_id);
              navigateToMovie();
            }}
          >
            {currentMovie.movie_name}
          </a>

          <Button
            style={{ height: "40px", width: "40px" }}
            className="btn-danger"
            onClick={() => {
              deleteMovie(currentMovie.id);
              setshow(false);
            }}
          >
            x
          </Button>
        </div>
      </li>
    </>
  ) : null;
}
