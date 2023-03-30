import React from "react";
import NoteList from "./NoteList";
import NotePage from "./NotePage";

const MainSection = ({
  note,
  activeTag,
  notes,
  tags,
  onNoteOpen,
  appState,
  setAppState,
  saveNote,
  getTag,
  checkedTags,
  setCheckedTags,
  activeNoteDate,
  setActiveNoteDate,
  onCreateNote
}) => {
  if (appState === "note") {
    return (
      <NotePage
        note={note}
        saveNote={saveNote}
        getTag={getTag}
        checkedTags={checkedTags}
        setCheckedTags={setCheckedTags}
        activeNoteDate={activeNoteDate}
        setActiveNoteDate={setActiveNoteDate}
      />
    );
  } else {
    return (
      <div className="main-container">
        <NoteList
          activeTag={activeTag}
          notes={notes}
          tags={tags}
          onNoteOpen={onNoteOpen}
          appState={appState}
          setAppState={setAppState}
          getTag={getTag}
          onCreateNote={onCreateNote}
        />
      </div>
    );
  }
};

export default MainSection;
