import React, { useState } from "react";
import "./LoginScreen.css";
import SignupScreen from "./SignupScreen";
import { useNavigate } from "react-router-dom";

function LoginScreen() {
  const [signIn, setSignIn] = useState(false);
  const navigate = useNavigate();
  const goBack = () => {
    setSignIn(false);
  };

  return (
    <div className="loginScreen">
      <div className="loginScreen__background">
        <div className="nav__logo">
          <h1 style={{
            display: "inline",
            fontSize: "24px",
            fontWeight: "bold",
            color: "White",
            textTransform: "uppercase",
          }}
            onClick={goBack} // Call the goBack function
          >
            MovieLand
          </h1>
        </div>
        {/* <button onClick={() => setSignIn(true)} className="loginScreen__button">
          Sign In
        </button> */}

        <div className="loginScreen__gradient" />
      </div>

      <div className="loginScreen__body">
        {signIn ? (
          <SignupScreen />
        ) : (
          <>
            <h1>Discover Endless Entertainment.</h1>
            <h2>Stream Anytime, Anywhere.</h2>
            <h3>
              Ready to Dive In? Enter Your Email to Start Exploring Our Collection.
            </h3>
            <div className="loginScreen__input">
              <form>
                  <input style={{ fontSize: "16px" }} type="email" placeholder="Email Address" />
                <button
                  onClick={() => setSignIn(true)}
                  className="loginScreen__getStarted"
                >
                  Sign in
                </button>
              </form>
            </div>
          </>
        )}


      </div>
    </div>
  );
}

export default LoginScreen;
