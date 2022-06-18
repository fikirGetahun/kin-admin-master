import "./Sidebar.css";
import React from "react";

import { Link } from "react-router-dom";
import { DarkModeContext } from "../../Context/darkModeContext";
import { useContext } from "react";
//react icons
import { AiFillDashboard } from "react-icons/ai";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

import { GiMusicalScore } from "react-icons/gi";
import { SiYoutubemusic } from "react-icons/si";
import { ImStatsBars } from "react-icons/im";

import { AiOutlineNotification } from "react-icons/ai";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { BiHistory } from "react-icons/bi";
import { AiOutlineSetting } from "react-icons/ai";
import { SiBlogger } from "react-icons/si";
import { BsFillFileEarmarkPostFill } from "react-icons/bs";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      {/* <div className="accordion accordion-flush" id="accordionFlushExample">
  <div className="accordion-item">
    <h2 className="accordion-header" id="flush-headingOne">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
        Accordion Item #1
      </button>
    </h2>
    <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
      <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header" id="flush-headingTwo">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
        Accordion Item #2
      </button>
    </h2>
    <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
      <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.</div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header" id="flush-headingThree">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
        Accordion Item #3
      </button>
    </h2>
    <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
      <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
    </div>
  </div>
</div> */}
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">K I N</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <AiFillDashboard className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="title">LISTS</p>
          <div className="accordion accordion-flush">
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingThree">
                <button
                  className="accordion-button h6 collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                >
                  Users
                </button>
              </h2>
              <div
                id="flush-collapseOne"
                className="accordion-collapse collapse"
                aria-labelledby="flush-headingOne"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  <Link to="/users/new" style={{ textDecoration: "none" }}>
                    <li>
                      <AiOutlineUsergroupAdd className="icon" />
                      <span>Add Users</span>
                    </li>
                  </Link>
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingThree">
                <button
                  className="accordion-button h6 collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapse3"
                  aria-expanded="false"
                  aria-controls="flush-collapse3"
                >
                  Album
                </button>
              </h2>
              <div
                id="flush-collapse3"
                className="accordion-collapse collapse"
                aria-labelledby="flush-headingOne"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  <Link to="/albumAdd/new" style={{ textDecoration: "none" }}>
                    <li>
                      <GiMusicalScore className="icon" />
                      <span>Add Album</span>
                    </li>
                  </Link>
                  <Link to="/albumView/view" style={{ textDecoration: "none" }}>
                    <li>
                      <GiMusicalScore className="icon" />
                      <span>List Album</span>
                    </li>
                  </Link>
                  <Link to="/trackAdd/add" style={{ textDecoration: "none" }}>
                    <li>
                      <GiMusicalScore className="icon" />
                      <span>Add Track</span>
                    </li>
                  </Link>
                  <Link to="/addAlbum/new" style={{ textDecoration: "none" }}>
                    <li>
                      <GiMusicalScore className="icon" />
                      <span>Add Album with track</span>
                    </li>
                  </Link>
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingThree">
                <button
                  className="accordion-button h6 collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapse2"
                  aria-expanded="false"
                  aria-controls="flush-collapse2"
                >
                  Artists
                </button>
              </h2>
              <div
                id="flush-collapse2"
                className="accordion-collapse collapse"
                aria-labelledby="flush-headingOne"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  <Link to="/album/new" style={{ textDecoration: "none" }}>
                    <li>
                      <GiMusicalScore className="icon" />
                      <span>Artists</span>
                    </li>
                  </Link>
                </div>
              </div>
            </div>

            <Link to="/musics" style={{ textDecoration: "none" }}>
              <li>
                <SiYoutubemusic className="icon" />
                <span>Musics</span>
              </li>
            </Link>
          </div>
          <p className="title">USEFUL</p>
          <li>
            <ImStatsBars className="icon" />
            <span>Stats</span>
          </li>
          <li>
            <AiOutlineNotification className="icon" />
            <span>Notifications</span>
          </li>
          <p className="title">SERVICE</p>
          <li>
            <MdOutlineReportGmailerrorred className="icon" />
            <span>Report</span>
          </li>
          <li>
            <BiHistory className="icon" />
            <span>History</span>
          </li>
          <li>
            <AiOutlineSetting className="icon" />
            <span>Settings</span>
          </li>
          <p className="title">Pages</p>
          <li>
            <SiBlogger className="icon" />
            <span>Blog</span>
          </li>
          <li>
            <BsFillFileEarmarkPostFill className="icon" />
            <span>Post</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
