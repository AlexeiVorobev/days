import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteNote } from "../features/notes/noteSlice";
import { updateNoteDropdownState, displayNoteList } from "../features/uiSlice";
import { setActiveNote } from "../features/notes/noteSlice";

export default function NoteMenuDropdown({
  tags,
  note
}) {
  const dispatch = useDispatch()
  const noteId = useSelector(state => state.notes?.activeNote?._id)
  const dropdownRef = useRef();
  const dropdownState = useSelector(state => state.ui.noteDropdownState)

  const onDeleteNote = function (id) {
    dispatch(deleteNote(id))
    dispatch(displayNoteList())
    dispatch(updateNoteDropdownState(false))
  };

  const onTagChange = function (e, tagId) {
    const newTagList = e.target.checked
      ? [...note.tagList, tagId]
      : note.tagList.filter(id => id !== tagId);

    dispatch(setActiveNote({
      ...note,
      tagList: newTagList
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        dispatch(updateNoteDropdownState(false));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  if (!dropdownState) return null;

  if (dropdownState === "main") {
    return (
      <div className="dropdown-content" ref={dropdownRef}>
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
          onClick={() => dispatch(updateNoteDropdownState("tags"))}
        >
          Edit tags
        </button>
        <button
          className="dropdown-btn"
          type="button"
          onClick={() => dispatch(updateNoteDropdownState("date"))}
        >
          Set date
        </button>
      </div>
    );
  } else if (dropdownState === "tags") {
    return (
      <div className="dropdown-content" ref={dropdownRef}>
        {tags.map((tag) => (
          <label key={tag._id}>
            <input
              type="checkbox"
              checked={note.tagList.includes(tag._id)}
              onChange={(e) => onTagChange(e, tag._id)}
            />
            {tag.name}
          </label>
        ))}
      </div>
    );
  } else if (dropdownState === "date") {
    return (
      <div className="dropdown-content" ref={dropdownRef}>
        <div className="dropdown-btn">
          <input
            type="date"
            name=""
            id=""
            value={note?.date}
            onChange={(e) => {
              dispatch(setActiveNote({
                ...note,
                date: e.target.value
              }));
            }}
          />
        </div>
      </div>
    );
  }
}
