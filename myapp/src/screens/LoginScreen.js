import React, { useState } from "react";
import "./LoginScreen.css";
import SignupScreen from "./SignupScreen";

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
    </div>

  )
}

export default LoginScreen