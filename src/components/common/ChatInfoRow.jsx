import React from "react";

function ChatInfoRow({ onClick, title, IconComponent }) {
  return (
    <div onClick={onClick} className="chatInfo__members__container">
      <div className="addMember__Icon__container">
        <IconComponent className="addMember__Icon" />
      </div>
      <p className="chatInfo__members__text">{title}</p>
    </div>
  );
}

export default ChatInfoRow;
