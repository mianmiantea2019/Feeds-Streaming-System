import React, { useState, useEffect } from "react";
import "./Nav.css";
// import logo from "./image/logo.JPG";

function Nav() {
  const [show, handleShow] = useState(false);

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <div className="nav__contents">
        {/* <img
          className="nav__logo"
          // src={logo}
          alt="MOVIELAND"
        /> */}
        <div className="nav__logo">
        <h1 style={{
          display:"inline",
          fontSize: "24px",
          fontWeight: "bold",
          color: "Grey",
          textTransform: "uppercase",
        }}>
          MovieLand
        </h1>
        </div>
        <img
          className="nav__avatar"
          src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
          alt=""
        />
      </div>
    </div>
  );
}

export default Nav;
