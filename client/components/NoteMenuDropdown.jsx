import React from 'react'

export default function NoteMenuDropdown({isActive, tags}) {
  if (isActive) {
    return (
      <div className='dropdown-content'>
        <button className='dropdown-btn' type='button'>Delete</button>
        <button className='dropdown-btn' type='button'>Edit tags</button>
      </div>
    )
  }
}
