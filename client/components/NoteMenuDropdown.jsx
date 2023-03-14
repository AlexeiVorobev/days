import React from 'react'
import { useRef, useEffect } from 'react';

export default function NoteMenuDropdown({dropdownState, tags, setDropdownState, onDeleteNote, note}) {

  const modalRef = useRef();
  
  const deleteHandler = function(id) {
    if (confirm("Do you want to delete the note?")) {
      onDeleteNote(id)
    }
  }
  
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

  if (dropdownState) {
    return (
      <div className='dropdown-content' ref={modalRef}>
        <button className='dropdown-btn' type='button' onClick={() => deleteHandler(note.id)}>Delete</button>
        <button className='dropdown-btn' type='button'>Edit tags</button>
      </div>
    )
  }
}
