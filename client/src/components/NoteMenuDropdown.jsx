import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteNote } from "../features/notes/noteSlice";
import { displayNoteList } from "../features/uiSlice";

export default function NoteMenuDropdown({
  dropdownState,
  tags,
  setDropdownState,
}) {
  const dispatch = useDispatch()
  const noteId = useSelector(state => state.notes?.activeNote?._id)
  const modalRef = useRef();

  const onDeleteNote = function (id) {
    dispatch(deleteNote(id))
    dispatch(displayNoteList())
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setDropdownState(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  if (dropdownState === "main") {
    return (
      <div className="dropdown-content" ref={modalRef}>
        <button
          className="dropdown-btn"
          type="button"
          onClick={() => onDeleteNote(noteId)}
        >
          Delete
        </button>
        <button
          className="dropdown-btn"
          type="button"
          onClick={() => setDropdownState("tags")}
        >
          Edit tags
        </button>
        <button
          className="dropdown-btn"
          type="button"
          onClick={() => setDropdownState("date")}
        >
          Set date
        </button>
      </div>
    );
  } else if (dropdownState === "tags") {
    return (
      <div className="dropdown-content" ref={modalRef}>
        {tags.map((tag) => (
          <label key={tag.id}>
            <input
              type="checkbox"
              checked={checkedTags.includes(tag.id)}
            />
            {tag.name}
          </label>
        ))}
      </div>
    );
  } else if (dropdownState === "date") {
    return (
      <div className="dropdown-content" ref={modalRef}>
        <div className="dropdown-btn">
          <input
            type="date"
            name=""
            id=""
            defaultValue={note.date}
          />
        </div>
      </div>
    );
  }
}
