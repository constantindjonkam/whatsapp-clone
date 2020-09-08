import React from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import "./css/login.css";

function Login({ onSubmit }) {
  return (
    <div className="login">
      <div className="login__container">
        <h1>Welcome!</h1>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1019px-WhatsApp.svg.png"
          alt="WhatsApp"
          className="login__image"
        />

        <h4>Sign in on WhatsApp web</h4>

        <button onClick={onSubmit}>
          Sign in with Google <ExitToAppIcon className="login__icon" />
        </button>
      </div>
    </div>
  );
}

export default Login;
