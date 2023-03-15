import React, { useEffect, useRef, useState } from "react";
import NoteMenuDropdown from "./NoteMenuDropdown";

const Header = ({
  title,
  note,
  appState,
  onTitleChange,
  onDeleteNote,
  tags,
  onUpdateNoteTag,
  checkedTags,
  setCheckedTags,
}) => {
  const titleRef = useRef();

  // Focus on title input if title is empty
  useEffect(() => {
    if (note && note.title === "") {
      titleRef.current.focus();
    }
  }, [appState]);

  const [noteDropdownState, setNoteDropdownState] = useState(false);

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
            onClick={() =>
              setNoteDropdownState(noteDropdownState ? false : "main")
            }
          >
            <span className="material-symbols-outlined">more_horiz</span>
          </button>
          <NoteMenuDropdown
            dropdownState={noteDropdownState}
            setDropdownState={setNoteDropdownState}
            note={note}
            onDeleteNote={onDeleteNote}
            tags={tags}
            onUpdateNoteTag={onUpdateNoteTag}
            checkedTags={checkedTags}
            setCheckedTags={setCheckedTags}
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
