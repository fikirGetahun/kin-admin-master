import "./new.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import "../../formSource";

import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
// import { trackA } from "../../formSource";
const NewAlbumOnly = ({ inputs, title }) => {
  const [file, setFile] = useState("");

  const [artist, setArtist] = useState();
  const [album_name, setTitle] = useState();
  const [album_description, setDesc] = useState();
  const [status, setStatus] = useState();
  const [ArtistsX, setArtistsX] = useState([]);
  const [cover, setCover] = useState();
  function submitAlbum(e) {
    e.preventDefault();
    const mainArtist = {
      album_cover: "http://34.76.194.211/media/album_id_None/logoo.jpeg",
      album_name: "",
      artist: null,
      album_description: "",
      tracks: [],
    };
    const mdata = new FormData();

    mdata.append("album_name", album_name);
    mdata.append("album_description", album_description);
    mdata.append("artist", artist);
    mdata.append("album_cover", file);

    var mainData = {
      album_name: album_name,
      album_description: album_description,
      artist: 1,
      album_cover: URL.createObjectURL(file),
    };

    var header = {
      "Content-Type": "application/json",
      // "Access-Control-Allow-Origin": "*",
    };

    // https://jsonplaceholder.typicode.com/todos/1

    axios({
      url: "http://34.76.194.211/api/media_crud/album/",
      method: "POST",
      headers: header,
      data: mdata,
    })
      .then((res) => {
        // alert(res.data);
        console.log(file);
        // console.log(res.data);
        // console.log(res);
        // alert(res.data);
        if (res.status == 201) {
          setStatus("Album Created Successfully!");
        } else {
          setStatus("error  ");
        }
      })
      .catch((err) => {
        setStatus(err);
      });
  }

  function getArtist() {
    axios
      .get("http://34.76.194.211/api/media_crud/artist")
      .then((res) => {
        // ArtistsX = res.data;
        setArtistsX(res.data);
        //   res.data.map(ke =>{
        //   })

        // alert(ArtistsX);
      })
      .catch((err) => {
        ArtistsX.push("error");
      });
  }

  useEffect(() => {
    getArtist();
  }, []);

  var StateOutput = [];

  StateOutput = [];
  if (status == "Album Created Successfully!") {
    // StateOutput.push(<span className="text text-success">Album Added</span>);
    // setStatus("Album Created Successfully!");
    StateOutput.push(<span className="text text-success">{status}</span>);
  } else if (status == "error") {
    // setStatus("Album Created Successfully!");
    StateOutput.push(<span className="text text-danger">ERROR!{status} </span>);
  } else {
    StateOutput = [];
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div></div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={submitAlbum} encType="multipart/form-data">
              <div className="row">
                <div className="col">
                  <h3>Select Artists</h3>
                  <select
                    className="form-select form-select mb-3"
                    name="artist"
                    onChange={(e) => {
                      setArtist(e.target.value);
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
              </div>
              <div className="formInput">
                <label htmlFor="file">
                  Image:{" "}
                  {/*<DriveFolderUploadOutlinedIcon className="icon" />*/}
                </label>
                <input
                  className="formInput"
                  type="file"
                  multiple
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <div className="row">
                <div className="row">
                  <label>Album Title</label>
                  <input
                    className="formInput"
                    placeholder="Album Title"
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                  <label>Album Description</label>
                  <input
                    className="formInput"
                    placeholder="Album Description"
                    onChange={(e) => {
                      setDesc(e.target.value);
                    }}
                  />
                </div>
              </div>

              <button type="submit">Add Album</button>
            </form>
            <div>{StateOutput}</div>
            {/* <span className="text text-success"></span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAlbumOnly;
