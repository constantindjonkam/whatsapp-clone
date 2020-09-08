import React from "react";
// import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import DoneAllIcon from "@material-ui/icons/DoneAll";

import "./css/message.css";
import messageTime from "../utils/messageTime";

function Message({ message, time, sender, name, image }) {
  // if (!message || !image) return null;

  return (
    <div className={`message ${sender && "sender"}`}>
      <p className="sender__name">{!sender && name}</p>
      {image && <img src={image} alt="uploaded" className="message__image" />}
      <p>{message}</p>
      <p className="message__time">
        {time && messageTime(time)}
        <DoneAllIcon className="message__DoneAllIcon" />
      </p>
    </div>
  );
}

export default Message;
