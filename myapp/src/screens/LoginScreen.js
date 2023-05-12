import React, { useState } from "react";
import "./LoginScreen.css";

function LoginScreen() {
  const [signIn, setSignIn] = useState(false);

  return (
    <div className="loginScreen">
      <div className="loginScreen__background">
        <button onClick={() => setSignIn(true)} className="loginScreen__button">
          Sign In
        </button>

        <div className="loginScreen__gradient" />
      </div>
      <div className="loginScreen__body">
        <>
          <h1>Discover Endless Entertainment.</h1>
          <h2>Stream Anytime, Anywhere.</h2>
          <h3>
            Ready to Dive In? Enter Your Email to Start Exploring Our Collection.
          </h3>

          <div className="loginScreen__input">
            <form>
              <input type="email" placeholder="Email Address" />
              <button
                onClick={() => setSignIn(true)}
                className="loginScreen__getStarted"
              >
                GET STARTED
              </button>
            </form>
          </div>
        </>
      </div>
    </div>

  )
}

export default LoginScreen