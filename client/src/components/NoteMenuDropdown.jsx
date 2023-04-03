import React, { useState, useEffect, useRef } from "react";

export default function NoteMenuDropdown({
  dropdownState,
  tags,
  setDropdownState,
  onDeleteNote,
  note,
  onUpdateNoteTag,
  checkedTags,
  setCheckedTags,
  activeNoteDate,
  setActiveNoteDate,
  onNoteDateChange,
}) {
  const modalRef = useRef();

  const deleteHandler = function (id) {
    onDeleteNote(id);
  };

  const changeDateHandler = function (noteId, newDate) {
    setActiveNoteDate(newDate);
    onNoteDateChange(noteId, newDate);
  };

  const handleTagChange = function (tagId) {
    const newCheckedTags = checkedTags.includes(tagId)
      ? checkedTags.filter((id) => id !== tagId)
      : [...checkedTags, tagId];
    setCheckedTags(newCheckedTags);
    onUpdateNoteTag(note._id, tagId);
  };

  useEffect(() => {
    setCheckedTags(note.tagList);
  }, [note]);

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
          onClick={() => deleteHandler(note._id)}
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
              onChange={() => handleTagChange(tag.id)}
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
            defaultValue={activeNoteDate}
            onChange={(e) => changeDateHandler(note._id, e.target.value)}
          />
        </div>
      </div>
    );
  }
}
