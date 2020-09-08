import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import { Avatar, IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Scrollbar from "react-scrollbars-custom";

import "./css/sideBar.css";
import SideBarChat from "./common/SideBarChat";
import { getGroups, addGroup } from "./services/groupService";

function SideBar({ avatar, email }) {
  const [focus, setFocus] = useState(false);
  const [input, setInput] = useState("");
  const [groups, setGroups] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    getGroups(setGroups, email);
  }, [email]);

  const history = useHistory();

  const handleFocus = () => {
    setFocus(!focus);
  };

  const gotoChat = (id) => {
    history.push("/chat/" + id);
    // console.log(history.location.pathname);
  };

  const handleShowMenu = () => {
    const name = prompt("Enter group name");
    addGroup(name, [email]);
    setShowMenu(!showMenu);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const filtered = groups.filter((g) =>
    g.name.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div className="sideBar">
      <div className="sideBar__header">
        <Avatar src={avatar} className="sideBar__avatar" />
        <div className="sideBar__header__right">
          <IconButton>
            <DonutLargeIcon className="sideBar__header__icon" />
          </IconButton>
          <IconButton>
            <ChatIcon className="sideBar__header__icon" />
          </IconButton>
          <div className="sideBar__more">
            <IconButton onClick={() => setShowMenu(!showMenu)}>
              <MoreVertIcon className="sideBar__header__icon" />
            </IconButton>
            <div className={`moreIcon__content ${showMenu && "show"}`}>
              <p onClick={handleShowMenu} className="groupMenu">
                New group
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={focus ? "sideBar__search whiteBg" : "sideBar__search"}>
        <div className="sideBar__searchContainer">
          <SearchIcon
            className={focus ? "hide" : "sideBar__searchButton show"}
          />
          <ArrowBackIcon
            className={focus ? "sideBar__arrowButton show" : "hide"}
          />
          <input
            id="sideBar__input"
            onFocus={handleFocus}
            onBlur={handleFocus}
            placeholder="Search or start new chat"
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="sideBar__chats">
        <Scrollbar>
          {filtered.map((group) => (
            <SideBarChat
              key={group.id}
              onClick={() => gotoChat(group.id)}
              name={group.name}
              lastMessage={group.lastMessage}
              date={group.date}
              avatar={group.image}
            />
          ))}
        </Scrollbar>
      </div>
    </div>
  );
}

export default SideBar;
