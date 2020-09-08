import React from "react";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { Avatar } from "@material-ui/core";

function ChatInfoMember({ members: member, onDelete }) {
  return (
    <div className="chatInfoMember">
      <div className="chatInfo__members__container">
        <Avatar src=" " alt={member} className="chatInfoMember__avatar" />
        <p className="chatInfo__members__text">{member}</p>
      </div>
      {member !== "You" && (
        <DeleteForeverIcon
          onClick={onDelete}
          className="chatInfoMember__icon"
        />
      )}
    </div>
  );
}

export default ChatInfoMember;
