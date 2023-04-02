import React, { useCallback, useState, useEffect, saveNote, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import format from "date-fns/format";

const toolbarOptions = [
  [{ 'header': 1 }, { 'header': 2 }],
  ['bold', 'italic', 'underline', 'strike' ],
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'color': [] }, 'link', 'clean'],
];

const NotePage = ({ note, saveNote, getTag, checkedTags, setCheckedTags, activeNoteDate, setActiveNoteDate }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    setCheckedTags(note.tagList);
  },[]);

  useEffect(() => {
    setActiveNoteDate(note.date);
  }, [])

  useEffect(() => {
    setContent(note.text);
  }, []);

  const handleChange = function (content) {
    setContent(content);
    saveNote(note.id, content);
  };

  return (
    <div className="main-container">
      <ReactQuill  modules={{ toolbar: toolbarOptions }} theme="snow" value={content} onChange={handleChange} />
      <div className="note-control-panel left-right">
        <div className="left">
          <div className="card-date">{format(new Date(activeNoteDate), "dd MMMM y")}</div>
          {
          checkedTags.map((tagId) => (
            <div key={tagId} className="tag-box">
              {getTag(tagId).name}
            </div>
          ))}
        </div>
        <div className="right"><button className="btn-special">Save</button></div>
      </div>
    </div>
  );
};

export default NotePage;
