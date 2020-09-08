import React from "react";

import "./css/fileMenu.css";

function FileMenu({ animate, onChange }) {
  return (
    <div className={`fileMenu ${animate && "animate"}`}>
      <label htmlFor="fileInput">
        <img
          className="fileMenu__icon"
          alt="icon"
          src={require("../../images/image.png")}
        />
      </label>
      <label htmlFor="fileType">
        <img
          className="fileMenu__icon"
          alt="icon"
          src={require("../../images/file.png")}
        />
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => onChange(e, "images")}
        id="fileInput"
      />
      <input type="file" onChange={(e) => onChange(e, "files")} id="fileType" />
    </div>
  );
}

export default FileMenu;
