import React, { useEffect, useRef, useState } from "react";
import NoteMenuDropdown from "./NoteMenuDropdown";

const Header = ({ title, note, appState, onTitleChange, onDeleteNote }) => {
  const titleRef = useRef();

  // Focus on title input if title is empty
  useEffect(() => {
    if (note && note.title === "") {
      titleRef.current.focus();
    }
  }, [appState]);

  const [NoteDropdownActive, setNoteDropdownActive] = useState(false);

  if (appState === "note") {
    return (
      <div className="header" style={{ boxShadow: "none" }}>
        <input
          className="note-title"
          type="text"
          value={note.title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Untitled"
          ref={titleRef}
        />
        <div className="dropdown">
          <button
            className="icon-btn"
            id="loginBtn"
            onClick={() => setNoteDropdownActive(!NoteDropdownActive)}
          >
            <span className="material-symbols-outlined">more_horiz</span>
          </button>
          <NoteMenuDropdown
            isActive={NoteDropdownActive}
            setIsActive={setNoteDropdownActive}
            note={note}
            onDeleteNote={onDeleteNote}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="header">
        <div className="header-title">{title}</div>
      </div>
    );
  }
};

export default Header;
