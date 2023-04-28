import React from "react";
import { MDBAccordion, MDBAccordionItem } from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";

export default function CustomToggle({ playlist, deleteMovie, movieInfo }) {
  return (
    <MDBAccordionItem collapseId={playlist.id} headerTitle={playlist.title}>
      <ol>
        {playlist.movies.map((movie) => (
          <>
            <li className="text-dark" onClick={() => movieInfo(movie.movie_id)}>
              <a>{movie.movie_name}</a>
            </li>
            <Button onClick={() => deleteMovie(movie.id)}></Button>
          </>
        ))}
      </ol>
    </MDBAccordionItem>
  );
}
