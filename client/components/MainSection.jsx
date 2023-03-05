import React from 'react';
import NoteList from './NoteList';
import NotePage from './NotePage';

const MainSection = ({activeNote, activeTag, notes, tags}) => {
  if (activeNote) {
    return (
    <div className="main-container">
      <NotePage activeNote={activeNote} />
    </div>
    )
  } else {
    return (
    <div className="main-container">
      <NoteList activeTag={activeTag} notes={notes} tags={tags} />
    </div>
    )
  }
  
}

export default MainSection