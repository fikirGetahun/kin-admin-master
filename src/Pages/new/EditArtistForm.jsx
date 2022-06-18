import "./new.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import { BASE_URL } from "../../env";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
//react-icons
import { BsUpload } from "react-icons/bs";
const EditArtistForm = (props) => {
  const [file, setFile] = useState("");
  const [artistData, setArtistData] = useState([]);
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [description, setDescription] = useState();
  const [prgColor, setPrgColor] = useState("green");
  const [prgrWidth, setPrgrWidth] = useState();
  const [progLevel, setProgLevel] = useState();
  const [artId, setArtId] = useState();
  const { idx } = useParams();
  useEffect(() => {
    getSingleUser();
  }, []);
  const getSingleUser = async () => {
    await Axios.get(`${BASE_URL}/artist/${idx}`).then((result) => {
      if (result.status == 200) {
        setArtistData(result.data);
      }
    });
    console.log(artistData);
  };
  const onSubmitHandler = async (e) => {
    const endpt = `${BASE_URL}/artist/${idx}/update`;
    const formData = new FormData();
    formData.append("artist_name", fname);
    formData.append("artist_avatar", file);
    formData.append("artist_description", description);

    e.preventDefault();
    const createArtist = await Axios.put(endpt, formData, {
      onUploadProgress: (progressEvent) => {
        setProgLevel(
          Math.round((progressEvent.loaded / progressEvent.total) * 100)
        );
      },
    }).then((res) => {
      if (res.status == 200) {
        alert("Edited!");
      }
    });
  };

  const progresStyle = {
    backgroundColor: "red",
    width: progLevel + "%",
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{props.title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={onSubmitHandler}>
              <div className="formInput">
                <label htmlFor="file">
                  <div className="left">
                    <img
                      src={
                        artistData.artist_avatar
                        //? URL.createObjectURL(file)
                        // : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                      }
                      alt=""
                    />
                    <BsUpload className="icon" htmlFor="filtage" />

                    <div className="progressbar" style={progresStyle}>
                      {progLevel}
                    </div>
                  </div>
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              <div className="formInput">
                <label>First Name</label>
                <input
                  type="text"
                  placeholder={artistData.artist_name}
                  onChange={(e) => setFname(e.target.value)}
                />
              </div>

              <div className="formInput">
                <label>Description</label>
                <textarea
                  rows="3"
                  className="textar"
                  placeholder={artistData.artist_description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditArtistForm;
