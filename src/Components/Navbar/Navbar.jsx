import "./Navbar.css";

import { DarkModeContext } from "../../Context/darkModeContext";
import { useContext } from "react";
import React from 'react';

//icons of react

import { GrLanguage } from 'react-icons/gr';
import { MdDarkMode } from 'react-icons/md';
import {GrNotification} from 'react-icons/gr';
import {BsChatDots} from 'react-icons/bs';
import {AiOutlineSearch} from 'react-icons/ai';
const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="search..." />
          <AiOutlineSearch className="icon"/>
          
        </div>
        <div className="items">
          <div className="item">
            <GrLanguage className="icon" />
            English
          </div>
          <div className="item">
           
           <MdDarkMode
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
             
          </div>
          
          <div className="item">
            
            <GrNotification className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <BsChatDots className="icon"/>
            <div className="counter">2</div>
          </div>
      
          <div className="item">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
