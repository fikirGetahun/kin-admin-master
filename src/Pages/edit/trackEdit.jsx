import React from "react";

import "../new/new.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import "../../formSource";

import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
const TrackEdit = () => {
  const [ArtistsX, setArtistsX] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [selectedArtistAlbumList, setSelectedArtistAlbumList] = useState([]);
  const [selectedAlbumName, setSelectedAlbumName] = useState();
  const [genre, setGenre] = useState();
  const [trakTitle, setTrackTitle] = useState();
  const [trackDesc, setTrackDesc] = useState();
  const [trackFile, setTrackFile] = useState();
  const [status, setStatus] = useState();

  const [TRACKDATA, setTRACKDATA] = useState([]);

  const { trackId } = useParams();

  useEffect(() => {
    getArtist();
    getTrackData();
  }, []);

  useEffect(() => {
    getAlbumOfArtist();
  }, [selectedArtist]);

  var stop = false;

  function submitTrack(e) {
    e.preventDefault();
    const trackData = new FormData();

    trackData.append("track_name", trakTitle);
    trackData.append("track_description", trackDesc);
    trackData.append("track_genre", genre);
    trackData.append("album", selectedAlbumName);
    trackData.append("track_file", trackFile);

    axios
      .put(
        `http://34.76.194.211/api/media_crud/track/${trackId}/update`,
        trackData
      )
      .then((res) => {
        if (res.status == 200) {
          setStatus("Track Posted Successfull");
        } else {
          setStatus(`error`);
        }
      });
  }
  var statusOutputer = [];
  if (status == "Track Posted Successfull") {
    statusOutputer = [];
    statusOutputer.push(
      <span className="text text-success">Track Edited!</span>
    );
  } else if (status == "error") {
    statusOutputer = [];
    statusOutputer.push(<span className="text text-danger">Error!</span>);
  } else {
    statusOutputer = [];
  }

  var selectAlbumOption = [];

  if (selectedArtist == null) {
    selectAlbumOption = [];
    selectAlbumOption.push(
      <div>
        <h3 disabled>Select Album</h3>
        <select
          className="form-select form-select mb-3 "
          name="artist"
          aria-label=".form-select example"
          disabled
        >
          <option>Not Select</option>
        </select>
      </div>
    );
  }
  const getAlbumOfArtist = async () => {
    await axios
      .get(`http://34.76.194.211/api/media_crud/artist/${selectedArtist}`, {})
      // .get(`http://localhost:8000/album${selectedArtist}`)

      .then((res) => {
        // ArtistsX = res.data;
        if (res.status == 200) {
          setSelectedArtistAlbumList(res.data["albums"]);
          console.log(res.data);
        }

        //   res.data.map(ke =>{
        //   })

        // alert(ArtistsX);
      })
      .catch((err) => {
        //   ArtistsX.push("error");
      });

    stop = true;
  };
  if (selectedArtist) {
    selectAlbumOption = [];

    selectAlbumOption.push(
      <div>
        <h3>Select Album</h3>
        <select
          className="form-select form-select mb-3 "
          name="artist"
          onChange={(e) => {
            setSelectedAlbumName(e.target.value);
          }}
          aria-label=".form-select example"
        >
          <option>Not Select</option>
          <option value="2">2</option>
          {selectedArtistAlbumList.map((ke) => (
            <option key={ke.id} value={ke.id}>
              {ke.album_name}
            </option>
          ))}
        </select>
      </div>
    );
  }

  function getArtist() {
    axios
      .get(`http://34.76.194.211/api/media_crud/artist`)
      // .get("http://localhost:8000/album")

      .then((res) => {
        if (res.status == 200) {
          setArtistsX(res.data);
        }

        // setSelectedArtist(res.data.artist);
        //   res.data.map(ke =>{
        //   })

        // alert(ArtistsX);
      })
      .catch((err) => {
        // ArtistsX.push("error");
      });
  }

  function getTrackData() {
    axios
      .get(`http://34.76.194.211/api/media_crud/track/${trackId}`)
      // .get("http://localhost:8000/album")

      .then((res) => {
        // setArtistsX(res.data);
        // setSelectedArtist(res.data.artist);
        //   res.data.map(ke =>{
        //   })
        if (res.status == 200) {
          setTRACKDATA(res.data);
          console.log(res.data);
          //   setSelectedArtist(TRACKDATA)
          //   setSelectedAlbumName(TRACKDATA.)
          setTrackTitle(TRACKDATA.track_name);
          setTrackDesc(TRACKDATA.track_description);
          setTrackFile(TRACKDATA.track_file);
        } else {
          setTRACKDATA("error!");
        }

        // alert(ArtistsX);
      })
      .catch((err) => {
        // ArtistsX.push("error");
      });
  }

  return (
    <div>
      <div className="new">
        <Sidebar />
        <div className="newContainer">
          <Navbar />
          <div className="top">{/* <h1>{title}</h1> */}</div>
          <div></div>
          <div className="bottom">
            <div className="right">
              <form onSubmit={submitTrack} encType="multipart/form-data">
                <div className="row">
                  <div className="col">
                    <h3>Select Artists</h3>
                    <select
                      className="form-select form-select mb-3"
                      name="artist"
                      onChange={(e) => {
                        setSelectedArtist(e.target.value);
                      }}
                      aria-label=".form-select example"
                    >
                      <option>Not Select</option>
                      {ArtistsX.map((ke) => (
                        <option key={ke.id} value={ke.id}>
                          {ke.artist_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col">
                    {/* <h3>Select Album</h3>
                    <select
                      className="form-select form-select mb-3"
                      name="artist"
                      onChange={(e) => {
                        selectedAlbumName(e.target.value);
                      }}
                      aria-label=".form-select example"
                    >
                      <option>Not Select</option>
                      {ArtistsX.map((ke) => (
                        <option key={ke.id} value={ke.id}>
                          {ke.artist_name}
                        </option>
                      ))}
                    </select> */}
                    {selectAlbumOption}
                  </div>
                  <div className="col">
                    <h3>Select Genre</h3>
                    <select
                      className="form-select form-select mb-3"
                      name="artist"
                      onChange={(e) => {
                        setGenre(e.target.value);
                      }}
                      aria-label=".form-select example"
                    >
                      <option selected value={TRACKDATA.track_genre}>
                        {" "}
                        {TRACKDATA.track_genre}{" "}
                      </option>
                      <option value="1"> reggea </option>
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="row">
                    <label>Track Title</label>
                    <input
                      className="formInput"
                      placeholder={TRACKDATA.track_name}
                      onChange={(e) => {
                        setTrackTitle(e.target.value);
                      }}
                    />
                    <label>Track Description</label>
                    <input
                      className="formInput"
                      placeholder={TRACKDATA.track_description}
                      onChange={(e) => {
                        setTrackDesc(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="formInput">
                  <label htmlFor="file">Add Track</label>
                  <input
                    className="formInput"
                    type="file"
                    multiple
                    id="file"
                    onChange={(e) => setTrackFile(e.target.files[0])}
                  />
                </div>

                <button type="submit">Add Track</button>
              </form>
              <div>{statusOutputer}</div>
              {/* <span className="text text-success"></span> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackEdit;
