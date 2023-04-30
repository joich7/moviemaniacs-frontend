import React from "react";
import { MDBAccordion, MDBAccordionItem } from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";

export default function CustomToggle({ playlist, deleteMovie, movieInfo }) {
  return (
    <MDBAccordionItem collapseId={playlist.id} headerTitle={playlist.title}>
      <ol>
        {playlist.movies.map((movie) => (
          <>
            <li className="text-dark">
              <h3 onClick={() => movieInfo(movie.movie_id)}>
                {movie.movie_name}
              </h3>
              <Button onClick={() => deleteMovie(movie.id)}></Button>
            </li>
          </>
        ))}
      </ol>
    </MDBAccordionItem>
  );
}
