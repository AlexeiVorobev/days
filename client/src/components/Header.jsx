import React, { useEffect, useRef, useState } from "react";
import NoteMenuDropdown from "./NoteMenuDropdown";
import { useSelector, useDispatch } from "react-redux";
import { displayNoteList } from "../features/uiSlice";

const Header = ({
  title,
  tags,
}) => {
  const dispatch = useDispatch();
  const note = useSelector(state => state.notes.activeNote)
  const mainView = useSelector(state => state.ui.mainView)
  const titleRef = useRef();

  // Focus on title input if title is empty
  useEffect(() => {
    if (mainView === 'note') {
      titleRef.current.focus();
    }
  }, [mainView]);

  const [noteDropdownState, setNoteDropdownState] = useState(false);

  const handleClickBackArrow = function () {
    dispatch(displayNoteList())
  };

  if (mainView === "note") {
    return (
      <div className="header" style={{ boxShadow: "none", border: "none" }}>
        <Overlay />
        <div className="left">
          <ToggleBtn />
          <input
            className="note-title"
            type="text"
            value={note?.title}
            placeholder="Untitled"
            ref={titleRef}
          />
        </div>
        <div className="right">
          <button
            className="icon-btn black header-btn"
            onClick={() => handleClickBackArrow()}
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="dropdown">
            <button
              className="icon-btn header-btn"
              id="noteDropdownBtn"
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
              tags={tags}
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
      <span className="material-symbols-outlined black header-btn">menu</span>
    </button>
  );
}

export default Header;
