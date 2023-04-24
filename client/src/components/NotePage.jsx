import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import format from "date-fns/format";
import { useDispatch, useSelector } from "react-redux";
import { setActiveNote, updateNote } from "../features/notes/noteSlice";
import {
  updateNoteDropdownState,
  displayNoteList,
} from "../features/uiSlice";
import NoteMenuDropdown from "./NoteMenuDropdown";
import { toast } from "react-toastify";

const toolbarOptions = [
  [{ header: 1 }, { header: 2 }],
  ["bold", "italic", "underline", "strike"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ color: [] }, "link", "clean"],
];

const NotePage = () => {
  const tags = useSelector((state) => state.tags.tags);
  const titleRef = useRef();
  const dispatch = useDispatch();
  const note = useSelector((state) => state.notes.activeNote);
  const dropdownActive = useSelector((state) => state.ui.noteDropdownState);

  const handleClickBack = function () {
    onSave();
    dispatch(displayNoteList());
  };

  const onSave = () => {
    dispatch(updateNote(note));
  };

  useEffect(() => {
    if (!note.title) {
      titleRef.current.focus();
    }
  }, []);

  const toggleDropdown = () => {
    if (dropdownActive) {
      dispatch(updateNoteDropdownState(false));
    } else {
      dispatch(updateNoteDropdownState("main"));
    }
  };

  return (
    <>
      <div className="header" style={{ boxShadow: "none", border: "none" }}>
        <div className="left">
          <input
            className="note-title"
            type="text"
            value={note.title ?? ""}
            placeholder="Untitled"
            ref={titleRef}
            onChange={(e) => {
              dispatch(
                setActiveNote({
                  ...note,
                  title: e.target.value,
                })
              );
            }}
          />
        </div>
        <div className="right">
          <button
            className="icon-btn black header-btn"
            onClick={() => handleClickBack()}
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="dropdown">
            <button
              className="icon-btn header-btn"
              id="noteDropdownBtn"
              onClick={toggleDropdown}
            >
              <span className="material-symbols-outlined">more_horiz</span>
            </button>
            <NoteMenuDropdown note={note} tags={tags} />
          </div>
        </div>
      </div>

      <div>
        <ReactQuill
          modules={{ toolbar: toolbarOptions }}
          theme="snow"
          value={note.text}
          onChange={(value) => {
            dispatch(
              setActiveNote({
                ...note,
                text: value,
              })
            );
          }}
        />
        <div className="note-control-panel left-right">
          <div className="left">
            <div className="card-date">
              {note?.date ? format(new Date(note.date), "dd MMMM y") : "---"}
            </div>
            {note?.tagList?.map((tagId) => {
              const tag = tags.find((tag) => tag._id === tagId)?.name;
              if (tag) {
                return (
                  <div key={tagId} className="tag-box">
                    {tags.find((tag) => tag._id === tagId)?.name}
                  </div>
                );
              }
            })}
          </div>
          <div className="right">
          <button className="btn-special" onClick={onSave}>
                Save
              </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotePage;
