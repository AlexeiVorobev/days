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
  getTag
}) => {
  if (appState === 'note') {
    return (
        <NotePage note={note} saveNote={saveNote} getTag={getTag} />
    );
  }  else {
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
        />
      </div>
    );
  }
};

export default MainSection;
