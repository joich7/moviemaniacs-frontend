import React from "react";
import { useGlobalState } from "../context/GlobalState";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import request from "../services/api.request";
import CustomToggle from "../components/CustomToggle";
import { MDBAccordion, MDBAccordionItem } from "mdb-react-ui-kit";
const EditPlaylist = ({ movieInfo }) => {
  const [state, dispatch] = useGlobalState();
  const [profile, setProfile] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [playlistText, setPlaylistText] = useState("");

  useEffect(() => {
    async function updatePlaylists() {
      let options = {
        url: `playlists/`, // just the endpoint
        method: "GET", // sets the method
      };
      let resp = await request(options); // await the response and pass in this fancy object of request options
      setPlaylists(resp.data); // set the response
    }
    updatePlaylists();
  }, []);
  return (
    <div className="container">
      <Button onClick={console.log(playlists)}>click</Button>
    </div>
  );
};

export default EditPlaylist;
