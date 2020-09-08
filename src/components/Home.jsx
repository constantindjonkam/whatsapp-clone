import React from "react";
import ComputerIcon from "@material-ui/icons/Computer";

import "./css/home.css";

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <div className="home__image"></div>
        <h1>Keep your phone connected</h1>
        <p>
          Whatsapp connects to your phone to sync messages. To reduce data
          usage, connect your phone to Wi-Fi.
        </p>
        <div className="home__footer">
          <ComputerIcon className="home__footer__icon" />
          <p className="home__footer__text">
            Whatsapp is available for Windows.{" "}
            <a
              href="https://www.whatsapp.com/download"
              target="_blank"
              style={{ color: "#07bc4c", textDecoration: "none" }}
              rel="noopener noreferrer"
            >
              Get it here.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
