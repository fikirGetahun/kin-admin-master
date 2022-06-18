import "../new/new.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import "../../formSource";

import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
// import { trackA } from "../../formSource";
const NewAlbumOnlyEdit = ({ inputs, title }) => {
  const { albumId } = useParams();

  const [albumData, setAlbumData] = useState([]);

  const [artist, setArtist] = useState();
  const [album_name, setTitle] = useState();
  const [album_description, setDesc] = useState();
  const [status, setStatus] = useState();
  const [ArtistsX, setArtistsX] = useState([]);
  const [cover, setCover] = useState();

  const [file, setFile] = useState("");
  const [EditArtist, setEditArtist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  var ShowInput = [];
  function changePhoto() {}

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

    if (file == null) {
      setFile(albumData.album_cover);
    }

    var mainData = {
      album_name: album_name,
      album_description: album_description,
      artist: 1,
      // album_cover: URL.createObjectURL(file),
    };

    var header = {
      "Content-Type": "application/json",
      // "Access-Control-Allow-Origin": "*",
    };

    // https://jsonplaceholder.typicode.com/todos/1

    // axios({
    //   url: "http://34.76.194.211/api/media_crud/album/",
    //   method: "UPDATE",
    //   headers: header,
    //   data: mdata,
    // });

    axios
      .put(`http://34.76.194.211/api/media_crud/album/${albumId}/update`, mdata)
      .then((res) => {
        // alert(res.data);
        console.log(file);
        // console.log(res.data);
        // console.log(res);
        // alert(res.data);
        if (res.status == 200) {
          setStatus("Album Edited Successfully!");
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

  function getArtistName() {
    axios
      .get(`http://34.76.194.211/api/media_crud/artist/${albumData.artist}`)
      .then((res) => {
        // ArtistsX = res.data;
        // setArtistsX(res.data);
        if (res.status == 200) {
          setEditArtist(res.data);
          console.log(res.data);
        }
        //   res.data.map(ke =>{
        //   })

        // alert(ArtistsX);
      })
      .catch((err) => {
        ArtistsX.push("error");
      });
  }

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

  useEffect(() => {
    getAlbumData();
    // setTitle(albumData.album_name);
    // setDesc(albumData.album_description);
    // setFile(albumData.album_cover);
    // setArtist(albumData.artist_name);
    getArtist();
    getArtistName();
  }, []);

  useEffect(() => {
    setTitle(albumData.album_name);
    setDesc(albumData.album_description);
    setFile(albumData.album_cover);
    setArtist(albumData.artist_name);
  }, [albumData]);

  var StateOutput = [];

  StateOutput = [];
  if (status == "Album Edited Successfully!") {
    // StateOutput.push(<span className="text text-success">Album Added</span>);
    // setStatus("Album Created Successfully!");
    StateOutput.push(<span className="text text-success">{status}</span>);
  } else if (status == "error") {
    // setStatus("Album Created Successfully!");
    StateOutput.push(<span className="text text-danger">ERROR!{status} </span>);
  } else {
    StateOutput = [];
  }

  const getAlbumData = async () => {
    await axios
      .get(`http://34.76.194.211/api/media_crud/album/${albumId}`)
      .then((data) => {
        if (data.status == 200) {
          setAlbumData(data.data);
        }
      });
  };

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
            <img src={albumData.album_cover} alt="" />
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
                    <option value={albumData.artist}>
                      {EditArtist.artist_name}
                    </option>
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
                    placeholder={albumData.album_name}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      // setAlbumData( album_name e.target.value );
                    }}
                  />
                  <label>Album Description</label>
                  <input
                    className="formInput"
                    placeholder={albumData.album_description}
                    onChange={(e) => {
                      setDesc(e.target.value);
                    }}
                  />
                </div>
              </div>
              {/* <button type="button" >Change Photo</button> */}

              <button type="submit">Edit Album</button>
              {showIsLoading}
            </form>

            <div>{StateOutput}</div>
            {/* <span className="text text-success"></span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAlbumOnlyEdit;
