import React from "react";
import { useRef } from "react";
import format from "date-fns/format";

const NoteList = ({ notes, tags, activeTag }) => {

  const getTag = function(id) {
    return tags.find(tag => tag.id === id)
  }

  const getNotesByTag = function (notes, tag) {
    const notesFiltered = notes.filter(note => note.tagList.includes(tag));
    return notesFiltered;
  }

  const notesToDisplay = activeTag ? getNotesByTag(notes, activeTag) : notes;
  if (!notesToDisplay || notesToDisplay.length === 0) return (
    <div className="main-empty">
      It's empty lol.
    </div>
  )

  let currentDate = new Date(notesToDisplay[0].date);
  
  return (
    <div>
      <h1 className="month-header">{format(currentDate, 'MMMM')} {format(currentDate, 'y')}</h1>
      {notesToDisplay.map((note) => {
        const date = new Date(note.date);
        let month = null;
        let year = null;
        if (format(currentDate, 'M') !== format(date, 'M') || format(currentDate, 'y') !== format(date, 'y')) {
          month = format(date, 'MMMM');
          year = format(date, 'y');
          currentDate = date;
        }
        return (
        <div key={note.id}>
          {month ? 
          <h1 className="month-header">{month} {year}</h1>
          : ""
          }
        <div className="note-card">
          <h1>{note.title}</h1>
          <p>{note.body}</p>
          <div className="card-bottom-panel">
            <div className="card-date">{format(date, 'dd MMMM y')}</div>
            {
              note.tagList.map(tagId => (
                <div key={tagId} className="tag-box">{getTag(tagId).name}</div>
              ))
            }
          </div>
        </div>
        </div>
        )
      })}
    </div>
  );
};

export default NoteList;