import React, { useState, useEffect } from "react";
import "./Nav.css";
// import logo from "./image/logo.JPG";
import { useNavigate } from "react-router-dom";
import { selectUser, logout } from "./features/userSlice";
import { useDispatch, useSelector } from "react-redux";


function Nav() {
  const [show, handleShow] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };


  const handleLogoClick = () => {
    if (user) {
      navigate("/home");
    } else {
      navigate("/login");
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
            fontSize: "24px",
            fontWeight: "bold",
            color: "Grey",
            textTransform: "uppercase",
          }}
            onClick={handleLogoClick}
          >
            MovieLand
          </h1>
        </div>
        <div className="nav__avatar">   
          <h1 style={{
          display: "inline",
          color: "Grey",
          fontSize: "20px",
        }}
          onClick={() => navigate("/profile")}
        >
          MyProfile
        </h1>    
         </div>
        {/* <img
          className="nav__avatar"
          src="https://img.tukuppt.com/ad_preview/00/59/71/sXRbYpHNLL.jpg!/both/260x260"
          alt="image1"
          onClick={() => navigate("/profile")}
        /> */}

      </div>
    </div>
  );
}

export default Nav;
