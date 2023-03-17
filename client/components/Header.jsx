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
  activeNoteDate,
  setActiveNoteDate,
  setCheckedTags,
  onNoteDateChange,
  setAppState
}) => {
  const titleRef = useRef();

  // Focus on title input if title is empty
  useEffect(() => {
    if (note && note.title === "") {
      titleRef.current.focus();
    }
  }, [appState]);

  const [noteDropdownState, setNoteDropdownState] = useState(false);

  const handleClickBackArrow = function() {
    setAppState('home')
  }

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
        <div className="right">
          <button className="icon-btn black" onClick={() => handleClickBackArrow()}>
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
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
              activeNoteDate={activeNoteDate}
              setActiveNoteDate={setActiveNoteDate}
              dropdownState={noteDropdownState}
              setDropdownState={setNoteDropdownState}
              note={note}
              onDeleteNote={onDeleteNote}
              tags={tags}
              onUpdateNoteTag={onUpdateNoteTag}
              checkedTags={checkedTags}
              setCheckedTags={setCheckedTags}
              onNoteDateChange={onNoteDateChange}
            />
          </div>
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
