import React from "react";

import "./new.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import "../../formSource";

import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
const TrackAdd = () => {
  const [ArtistsX, setArtistsX] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [selectedArtistAlbumList, setSelectedArtistAlbumList] = useState([]);
  const [selectedAlbumName, setSelectedAlbumName] = useState();
  const [genre, setGenre] = useState();
  const [trakTitle, setTrackTitle] = useState();
  const [trackDesc, setTrackDesc] = useState();
  const [trackFile, setTrackFile] = useState();
  const [status, setStatus] = useState();
  const controller = new AbortController();

  const [isLoading, setIsLoading] = useState(false);

  const getAlbumOfArtist = () => {
    axios
      .get(`http://34.76.194.211/api/media_crud/artist/${selectedArtist}`, {
        signal: controller.signal,
      })
      // .get(`http://localhost:8000/album${selectedArtist}`)

      .then((res) => {
        // ArtistsX = res.data;
        if (res.status == 200) {
          setSelectedArtistAlbumList(res.data["albums"]);
          setIsLoading(false);
        } else {
        }

        // console.log(res.data);
        //   res.data.map(ke =>{
        //   })

        // alert(ArtistsX);
      })
      .catch((err) => {
        //   ArtistsX.push("error");
      });
  };

  var showIsLoading = [];

  if (isLoading) {
    showIsLoading = [];
    showIsLoading.push(
      <div>
        <div class="d-flex align-items-center">
          <strong>Loading...</strong>
          <div
            class="spinner-border ms-auto"
            role="status"
            // aria-hidden="true"
          ></div>
        </div>
      </div>
    );
  } else {
    showIsLoading = [];
  }

  const getArtist = async () => {
    await axios
      .get("http://34.76.194.211/api/media_crud/artist")
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
  };

  useEffect(() => {
    getArtist();
  }, []);

  useEffect(() => {
    getAlbumOfArtist();
  }, [selectedArtist]);
  function submitTrack(e) {
    e.preventDefault();
    setIsLoading(true);
    const trackData = new FormData();

    trackData.append("track_name", trakTitle);
    trackData.append("track_description", trackDesc);
    trackData.append("track_genre", genre);
    trackData.append("album", selectedAlbumName);
    trackData.append("track_file", trackFile);

    axios
      .post("http://34.76.194.211/api/media_crud/track/", trackData)
      .then((res) => {
        if (res.status == 201) {
          setStatus("good");
          setIsLoading(false);
        } else {
          setStatus(`error`);
        }
      });
  }
  var statusOutputer = [];
  if (status == "good") {
    statusOutputer = [];
    statusOutputer.push(
      <span className="text text-success">Track Posted!</span>
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

  if (selectedArtist) {
    selectAlbumOption = [];

    // controller.abort();

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
          {selectedArtistAlbumList.map((ke) => (
            <option key={ke.id} value={ke.id}>
              {ke.album_name}
            </option>
          ))}
        </select>
      </div>
    );
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
                      <option>Not Select</option>
                      <option value="1"> reggea </option>
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="row">
                    <label>Track Title</label>
                    <input
                      className="formInput"
                      placeholder="Album Title"
                      onChange={(e) => {
                        setTrackTitle(e.target.value);
                      }}
                    />
                    <label>Track Description</label>
                    <input
                      className="formInput"
                      placeholder="Album Description"
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
                {showIsLoading}
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

export default TrackAdd;
