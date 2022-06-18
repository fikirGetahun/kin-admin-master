import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "../new/new.css";
import { Link } from "react-router-dom";

export default function AlbumView() {
  // useEffect({
  //   fetch( )
  // },[])
  const [albums, setAlbums] = useState([]);
  const [selArtist, setSelArtist] = useState([]);
  const styl = {
    display: "flex",
    flexDirection: "column",
    aligntems: "center",
  };

  useEffect(() => {
    getAlbums();
    getSingleArtist();
  }, []);

  function deleteData(id, index) {
    axios
      .delete(`http://34.76.194.211/api/media_crud/album/${id}/delete`, {
        id: id,
      })
      .then((data) => {
        if (data.status == 204) {
          // setAlbums(splice(index, 1));
          alert("content deleted!");
        } else {
          alert("error occured!");
        }
      });
  }

  function getAlbums() {
    axios
      .get("http://34.76.194.211/api/media_crud/album/")
      .then((res) => {
        if (res.status == 200) {
          setAlbums(res.data);
        } else {
          alert("error occured");
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  var artName = [];
  function getSingleArtist(aid) {
    var art = [];

    axios
      .get(`http://34.76.194.211/api/media_crud/artist/${aid}`)
      .then((data) => {
        if (data.status == 200) {
          // art = data.data[`${aid}`].artist_name;
          // setSelArtist(data.data.);
          // artName = data.data;
          console.log(data.data, "dfddfdfdfdfdffddfdf");
          return data.data.artist_name;
        } else {
          return "unknown Artist!";
        }
      });
  }
  return (
    <div className="new">
      <Sidebar />

      <div className="newContainer">
        <div className="bottom" style={styl}>
          <select
            className="form-select form-select mb-3"
            name="artist"
            aria-label=".form-select example"
          >
            <option>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          <br />

          <div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">artist</th>
                  <th scope="col">Album Name</th>
                  <th scope="col">Album Discription</th>
                  <th scope="col">Album Photo</th>

                  <th scope="col">Update</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {albums.map((ke, index) => (
                  <tr key={ke.id}>
                    <td>
                      {
                        // (console.log(ke.artist, "sthis is is is "),
                        getSingleArtist(ke.artist)
                      }
                      {}
                    </td>
                    <td>{ke.album_name}</td>
                    <td>{ke.album_description}</td>
                    <td>
                      <img src={ke.album_cover} alt="" />
                    </td>
                    <td>
                      <Link to={`/albumEdit/${ke.id}`}>
                        <button>UPdate</button>
                      </Link>
                    </td>
                    <td onClick={() => deleteData(ke.id, index)}>
                      <button>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
