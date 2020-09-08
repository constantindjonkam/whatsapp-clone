import React from "react";
import { Avatar } from "@material-ui/core";

import "./css/sideBarChat.css";
import { convertDate } from "../utils/messageTime";

function SideBarChat({ avatar, name, active, onClick, lastMessage, date }) {
  return (
    <div onClick={onClick} className={`sideBarChat ${active}`}>
      <div className="sideBarChat__container">
        <Avatar src={avatar} alt={name} className="sideBarChat__avatar" />
        <div className="sideBarChat__info">
          <h4>{name}</h4>
          <p>{lastMessage}</p>
        </div>
      </div>

      <div className="sideBarChat__timeStand">
        <p>{convertDate(date?.seconds)}</p>
      </div>
    </div>
  );
}

export default SideBarChat;
