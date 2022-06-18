import "./new.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import "../../formSource";

import { useState } from "react";
// import { trackA } from "../../formSource";
const NewAlbumOnlyEdit = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [trackNo, setTrackNo] = useState(0);
  const [listCommand, setListCommand] = useState(false);

  function listCommandw() {
    setListCommand(true);
  }

  var addList = [];
  function addTrack() {
    if (trackNo > 0 && listCommand == true) {
      if (trackNo > 20) {
        addList.push(
          <div>
            <span className="text text-danger">
              You cant more than 20 tracks
            </span>
          </div>
        );
      } else {
        for (var i = 1; i <= trackNo; i++) {
          addList.push(
            <div>
              <div>
                <input name={"track_name" + i} placeholder={"Track " + i} />
                <input
                  name={"track_desc" + i}
                  placeholder={"Track Description " + i}
                />
                <lable>Add Track</lable>
                <input type="file" name={"track_file" + i} />
              </div>
            </div>
          );
        }
      }
    }
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
            <form>
              <div className="row">
                <div className="col">
                  <h3>Select Artists</h3>
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
                </div>
              </div>
              <div className="formInput">
                <label htmlFor="file">
                  Image:{" "}
                  {/*<DriveFolderUploadOutlinedIcon className="icon" />*/}
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              <div className="row">
                {inputs.map((input) => (
                  <div className="row">
                    <div className="formInput col" key={input.id}>
                      <label>{input.label}</label>
                      <input
                        type={input.type}
                        placeholder={input.placeholder}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAlbumOnlyEdit;
