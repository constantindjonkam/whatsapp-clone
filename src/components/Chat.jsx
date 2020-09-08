import React, { useState, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import SendIcon from "@material-ui/icons/Send";
import ArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { Avatar } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";
import Scrollbar from "react-scrollbars-custom";
import { useParams } from "react-router-dom";

import "./css/chat.css";
import Message from "./common/Message";
import { addMessage, getMessages } from "./services/messageService";
import { getGroups } from "./services/groupService";
import ChatInfo from "./ChatInfo";
import FileMenu from "./common/FileMenu";
import handleUpload from "./services/storageService";

function Chat({ user }) {
  const [input, setInput] = useState("");
  const [groups, setGroups] = useState([]);
  const [messages, setMessages] = useState([]);
  const [showChatInfo, setShowChatInfo] = useState(false);
  const [showFileMenu, setShowFileMenu] = useState(false);
  const [progress, setProgress] = useState(0);
  const { groupId } = useParams();

  useEffect(() => {
    getGroups(setGroups, user.email);
    getMessages(setMessages);
  }, [user.email]);

  const handleInput = (e) => {
    if (!e.target.value.trim()) {
      setInput("");
      return;
    }
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addMessage(input, groupId, user.displayName, user.email);
    setInput("");
  };

  const handleChatInfo = () => {
    setShowChatInfo(true);
  };

  const handleFileUpload = (e, folder, message = "") => {
    handleUpload(
      e,
      folder,
      setProgress,
      message,
      groupId,
      user.displayName,
      user.email
    );
  };

  const chatMessages = messages.filter((m) => m.groupId === groupId);
  let group = groups.filter((g) => g.id === groupId);
  group = group[0];

  let members = chatMessages.map((m) => m.name);
  members = [...new Set(members)]
    .sort((a, b) => a + b)
    .join(", ")
    .replace(user.displayName, "You");

  return (
    <div className={`mainChat ${showChatInfo && "moreWidth"}`}>
      <div className="chat">
        <div className="chat__header">
          <div onClick={handleChatInfo} className="chat__header__left">
            <Avatar
              src={group && group.image}
              className="chat__header__avatar"
            />
            <div className="chat__headerInfo">
              <h4>{group && group.name}</h4>
              <p>{members}</p>
            </div>
          </div>
          <div className="chat__headerRight">
            <SearchIcon className="chat_iconColor" />
            <div className="chat__attachFileConatiner">
              <AttachFileIcon
                onClick={() => {
                  setShowFileMenu(!showFileMenu);
                }}
                className="chat__attachFileIcon"
              />
              <FileMenu onChange={handleFileUpload} animate={showFileMenu} />
            </div>
            <MoreVertIcon className="chat_iconColor" />
          </div>
        </div>

        <div className="chat__body">
          <div className="chat__body__bg">
            <Scrollbar scrollTop={500000}>
              <div className="chat__body__container">
                {chatMessages.map((m) => (
                  <Message
                    key={m.id}
                    message={m.message}
                    time={m.date?.toDate()}
                    sender={m.email === user.email}
                    name={m.name}
                    image={m.image}
                  />
                ))}
              </div>
              <div id="end"></div>
              {progress !== 100 && (
                <CircularProgress variant="determinate" value={progress} />
              )}
            </Scrollbar>
            <a href="#end" className="chat__body__downIconContainer">
              <ArrowDownIcon className="chat__body__downIcon" />
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="chat__footer">
          <InsertEmoticonIcon className="chat__footer__emoji" />
          <div className="chat__footer__input">
            <input
              value={input}
              onChange={handleInput}
              placeholder="Type a message"
            />
          </div>
          <MicIcon className={`chat__footer__mic ${input && "hide"}`} />
          <SendIcon
            onClick={handleSubmit}
            className={`chat__footer__mic ${!input && "hide"}`}
          />
        </form>
      </div>
      {showChatInfo && (
        <ChatInfo
          onClose={() => setShowChatInfo(false)}
          className="chatInfo"
          group={group}
          members={members}
          user={user}
        />
      )}
    </div>
  );
}

export default Chat;
