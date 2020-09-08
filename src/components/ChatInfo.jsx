import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import LinkIcon from "@material-ui/icons/Link";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import { Avatar } from "@material-ui/core";
import { useParams } from "react-router-dom";

import "./css/chatInfo.css";
import {
  addMemberToGroup,
  removeMemberFromGroup,
  updateGroupName,
} from "./services/groupService";
import ChatInfoRow from "./common/ChatInfoRow";
import ChatInfoMember from "./common/ChatInfoMember";
import Scrollbar from "react-scrollbars-custom";
import { convertDateAndTime } from "./utils/messageTime";
import { updateGroupImages } from "./services/storageService";

function ChatInfo({ onClose, group, members, user }) {
  const { groupId } = useParams();

  const addMember = async () => {
    const email = prompt(
      "Please enter gmail address of person you want to add"
    );

    if (/@gmail\.com$/.test(email)) {
      await addMemberToGroup(groupId, email);
      alert("Request sent to user!");
    } else alert(email + " is not a valid gmail address");
  };

  const handleDelete = (email) => {
    alert("feature disable");
    return;
    removeMemberFromGroup(groupId, email);
  };

  const handleGroupImage = (e) => {
    updateGroupImages(e, groupId);
  };

  const handleGroupName = () => {
    const name = prompt("Enter new group name please");
    if (!name.trim()) {
      alert("Invalid name!!!");
      return;
    }
    updateGroupName(groupId, name);
  };

  return (
    <div className="chatInfo">
      <header className="chatInfo__header">
        <CloseIcon className="chatInfo__close" onClick={onClose} />{" "}
        <p>Group Info</p>
      </header>

      <Scrollbar>
        <div className="chatInfo__info">
          <label htmlFor="groupImage" className="chatInfo__avatar__container">
            <Avatar className="chatInfo__avatar" src={group.image} />
            <div className="chatInfo__text">
              <CameraAltIcon />
              <p>CHANGE GROUP ICON</p>
            </div>
          </label>
          <input
            onChange={handleGroupImage}
            type="file"
            id="groupImage"
            accept="image/*"
          />
          <div className="chatInfo__groupInfo">
            <p className="chatInfo__name">
              {group.name}{" "}
              <EditIcon
                onClick={handleGroupName}
                className="chatInfo__editIcon"
              />
            </p>
            <p className="chatInfo__date">
              Created {convertDateAndTime(group.dateCreated.seconds)}
            </p>
          </div>
        </div>

        <div className="chatInfo__members">
          <p className="chatInfo__participants">
            {members.split(", ").length} participants
          </p>
          <ChatInfoRow
            title="Add participant"
            onClick={addMember}
            IconComponent={PersonAddIcon}
          />
          <ChatInfoRow
            title="Invite to group via link"
            onClick={addMember}
            IconComponent={LinkIcon}
          />
          {members.split(", ").map((m) => (
            <ChatInfoMember key={m} members={m} onDelete={handleDelete} />
          ))}
        </div>
      </Scrollbar>
    </div>
  );
}

export default ChatInfo;
