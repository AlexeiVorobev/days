import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import format from "date-fns/format";
import { useDispatch, useSelector } from 'react-redux';
import { setActiveNote, updateNote } from "../features/notes/noteSlice";

const toolbarOptions = [
  [{ 'header': 1 }, { 'header': 2 }],
  ['bold', 'italic', 'underline', 'strike' ],
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'color': [] }, 'link', 'clean'],
];

const NotePage = ({ getTag }) => {
  const dispatch = useDispatch()
  const note = useSelector(state => state.notes.activeNote)

  const [content, setContent] = useState(note.text);
  const [date, setDate] = useState(note.date)
  const [title, setTitle] = useState(note.title)

  const onContentChange = function (content) {
    setContent(content);
  };

  const onSave = () => {
    const updatedNote = {
      _id: note._id,
      text: content,
      date: date,
      title: title
    }
    dispatch(setActiveNote(updatedNote))
    dispatch(updateNote(updatedNote))
  }

  return (
    <div className="main-container">
      <ReactQuill  modules={{ toolbar: toolbarOptions }} theme="snow" value={content} onChange={onContentChange} />
      <div className="note-control-panel left-right">
        <div className="left">
          <div className="card-date">{note.date ? format(new Date(note.date), "dd MMMM y") : '---'}</div>
          {
          note.tagList?.map((tagId) => (
            <div key={tagId} className="tag-box">
              {getTag(tagId).name}
            </div>
          ))}
        </div>
        <div className="right"><button className="btn-regular" onClick={onSave}>Save</button></div>
      </div>
    </div>
  );
};

export default NotePage;
