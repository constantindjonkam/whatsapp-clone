import React from "react";

import "./css/login.css";

function Unavailable({ onSubmit }) {
  return (
    <div className="login">
      <div className="login__container">
        <h1>Hello!</h1>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1019px-WhatsApp.svg.png"
          alt="WhatsApp"
          className="login__image"
        />

        <h4>Sorry! Whatsapp web is only available for large screen devices.</h4>
      </div>
    </div>
  );
}

export default Unavailable;
