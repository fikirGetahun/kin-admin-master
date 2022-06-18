import "./trackList.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
//import { DriveEta } from "@material-ui/icons"
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { GiEternalLove } from "react-icons/gi";
import { BASE_URL } from "../../env";
const TrackList = () => {
  /*
    {
  "album_name": "string",
  "artist": 0,
  "album_genre": 0,
  "album_description": "string",
  "tracks": [
    {
      "track_name": "string",
      "track_description": "string",
      "album": 0,
      artistID
    }
  ]
}
    */
  const [trackData, setTrackData] = useState([]);
  const [artistId, setArtistId] = useState();
  const [trackId, setTrackId] = useState();
  const [trackName, setTrackName] = useState();
  const [description, setDescription] = useState();
  const [albumId, setAlbumId] = useState();
  const [albumName, setAlbumName] = useState();

  useEffect(() => {
    trackList();
    handleDelete();
  }, [trackId]);

  const trackList = async () => {
    let endpt = BASE_URL + "/track/";
    const resp = await Axios.get(endpt).then((res) => setTrackData(res.data));
    console.log(resp);
  };
  const handleDelete = async () => {
    let endpt = BASE_URL + "/track/" + trackId;
    const resp = await Axios.delete(endpt);
    //http://34.78.10.124/artist/{artist_id}/
    alert("You have deleted the track");
  };
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div>
          <div className="btnConatiner">
            <Link to="/track" className="addbtn">
              Add Track
            </Link>
          </div>
          <table className="tableContainer">
            <tr className="tr">
              <th>Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th colSpan="2">Action</th>
            </tr>
            {trackData.map((trac) => {
              return (
                <tr key={trac.track_id} className="tr">
                  <td>{trac.track_name}</td>
                  <td>{trac.track_description}</td>

                  <td
                    onClick={() => setArtistId(trac.track_id)}
                    className="tbDButtn"
                  >
                    <button
                      onClick={() => setArtistId(trac.track_id)}
                      className="tbDButtn"
                    >
                      delete
                    </button>
                  </td>
                  <td>
                    <Link to={"/trackEdit/" + trac.id}>
                      <button
                        onClick={() => setArtistId(trac.track_id)}
                        className="tbUButton"
                      >
                        Update
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
};

export default TrackList;
