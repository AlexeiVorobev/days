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
  setAppState,
  onCreateNote,
}) => {
  const titleRef = useRef();

  // Focus on title input if title is empty
  useEffect(() => {
    if (appState === 'note' && note.title === "") {
      titleRef.current.focus();
    }
  }, [appState]);

  const [noteDropdownState, setNoteDropdownState] = useState(false);

  const handleClickBackArrow = function () {
    setAppState("home");
  };

  if (appState === "note") {
    return (
      <div className="header" style={{ boxShadow: "none" }}>
        <Overlay />
        <div className="left">
          <ToggleBtn />
          <input
            className="note-title"
            type="text"
            value={note.title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Untitled"
            ref={titleRef}
          />
        </div>
        <div className="right">
          <button
            className="icon-btn black"
            onClick={() => handleClickBackArrow()}
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="dropdown">
            <button
              className="icon-btn"
              id="noteDropdownBtn"
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
        <Overlay onClick={toggleMenu} />
        <div className="left">
          <ToggleBtn />
          <div className="header-title">{title}</div>
        </div>
        <div className="right">
          <button id="HeaderNewNote" onClick={onCreateNote}>
            <span className="material-symbols-outlined black">add</span>
          </button>
        </div>
      </div>
    );
  }
};

const toggleMenu = function () {
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".sidebar-overlay");
  if (!overlay.classList.contains("active")) {
    sidebar.classList.add("active");
    overlay.classList.add("active");
  } else {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  }
};

function Overlay() {
  return <div className="sidebar-overlay" onClick={toggleMenu}></div>;
}

function ToggleBtn() {
  return (
    <button className="toggle-menu-btn" onClick={toggleMenu}>
      <span className="material-symbols-outlined black">menu</span>
    </button>
  );
}

export default Header;
