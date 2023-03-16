import React, { useCallback, useState, useEffect, saveNote, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import format from "date-fns/format";

const NotePage = ({ note, saveNote, getTag, checkedTags, setCheckedTags, activeNoteDate, setActiveNoteDate }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    setCheckedTags(note.tagList);
  },[]);

  useEffect(() => {
    setActiveNoteDate(note.date);
  }, [])

  useEffect(() => {
    setContent(note.body);
  }, []);

  const handleChange = function (content) {
    setContent(content);
    saveNote(note.id, content);
  };

  return (
    <div className="main-container">
      <ReactQuill theme="snow" value={content} onChange={handleChange} />
      <div className="note-control-panel">
        <div className="card-date">{format(new Date(activeNoteDate), "dd MMMM y")}</div>
        {
        checkedTags.map((tagId) => (
          <div key={tagId} className="tag-box">
            {getTag(tagId).name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotePage;
