import React from "react";
import format from "date-fns/format";

const MAX_PREVIEW_TEXT_LENGTH = 250;

const NoteList = ({
  notes,
  tags,
  activeTag,
  onNoteOpen,
  appState,
  setAppState,
  getTag,
  onCreateNote,
}) => {
  function removeTags(str) {
    if (!str || str === "") return false;
    else str = str.toString();

    return str.replace(/(<([^>]+)>)/gi, " ");
  }

  const getNotesByTag = function (notes, tag) {
    const notesFiltered = notes.filter((note) => note.tagList.includes(tag));
    return notesFiltered;
  };

  const notesToDisplay = activeTag ? getNotesByTag(notes, activeTag) : notes;
  if (!notesToDisplay || notesToDisplay.length === 0)
    return (
    <div className="main-empty">No entries
    <button id="headerNewNote" onClick={onCreateNote}>
        <span className="material-symbols-outlined black">add</span>
      </button>
    </div>
    );

  const handleNoteClick = function (noteId) {
    onNoteOpen(noteId);
    setAppState("note");
  };

  let currentDate = notesToDisplay[0].date
    ? new Date(notesToDisplay[0].date)
    : new Date();

  return (
    <div className="note-container">
      <button id="headerNewNote" onClick={onCreateNote}>
        <span className="material-symbols-outlined black">add</span>
      </button>
      <h1 className="month-header">
        {format(currentDate, "MMMM")} {format(currentDate, "y")}
      </h1>
      {notesToDisplay.map((note) => {
        const date = note.date ? new Date(note.date) : new Date();
        let text = removeTags(note.text);
        if (text.length > MAX_PREVIEW_TEXT_LENGTH) {
          text = text.substring(0, MAX_PREVIEW_TEXT_LENGTH - 1) + "...";
        }
        let month = null;
        let year = null;
        if (
          format(currentDate, "M") !== format(date, "M") ||
          format(currentDate, "y") !== format(date, "y")
        ) {
          month = format(date, "MMMM");
          year = format(date, "y");
          currentDate = date;
        }
        return (
          <div key={note._id}>
            {month ? (
              <h1 className="month-header">
                {month} {year}
              </h1>
            ) : (
              ""
            )}
            <div className="note-card" onClick={() => handleNoteClick(note.id)}>
              <h1>{note.title}</h1>
              <p>{text}</p>

              <div className="card-bottom-panel">
                <div className="card-date">{format(date, "dd MMMM y")}</div>
                {note.tagList.map((tagId) => (
                  <div key={tagId} className="tag-box">
                    {getTag(tagId).name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NoteList;
