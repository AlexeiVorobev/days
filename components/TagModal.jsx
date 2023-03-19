import React, { useRef, useState } from "react";

export default function TagModal({
  isActive,
  onClose,
  tags,
  onAddTag,
  onDeleteTag,
  onUpdateTag,
}) {
  if (!isActive) {
    return "";
  }

  const tagsUpdated = useRef([...tags]);
  const newTagNameRef = useRef();

  const handleTagChange = function (id, newName) {
    const updatedTagsUpdated = tagsUpdated.current.map(tag => { 
      if (tag.id === id) {
        return {id: id, name: newName}
      } else {
        return tag;
      }
    })
    tagsUpdated.current = updatedTagsUpdated;
  }

  const deleteHandler = function(id, e) {
    e.preventDefault();
    if (confirm("Tag will be deleted. It will be removed from all note instances, but all notes persist.")) {
      onDeleteTag(id)
    }
  }

  const submitTagChange = function (tagId) {
    const tagUpdated = tagsUpdated.current.find(tag => tag.id === tagId)
    console.log(tagUpdated);
    onUpdateTag(tagUpdated);
  }

  function onOverlayClick(e) {
    if (e.target.classList.contains('overlay')) {
      onClose()
    }
  }

  return (
    <div className="overlay" onClick={(e) => onOverlayClick(e)}>
      <form className="modal">
        <h1>Edit tags</h1>
        <div className="modal-tag">
          <button className="icon-btn" type="button" onClick={() => newTagNameRef.current.value = ""}>
            <span className="material-symbols-outlined">close</span>
          </button>
          <input
            type="text"
            id="newTagNameField"
            placeholder="Create tag"
            autoFocus
            ref={newTagNameRef}
          />
          <button
            type="button"
            className="icon-btn"
            onClick={() => {
              onAddTag({name: newTagNameRef.current.value})
              newTagNameRef.current.value = "";
            }}
          >
            <span className="material-symbols-outlined">done</span>
          </button>
        </div>
        {tags.map((tag) => (
          <div className="modal-tag" key={tag.id}>
            <button className="icon-btn">
              <span
                className="material-symbols-outlined"
              >
                label
              </span>
            </button>
            <input type="text" defaultValue={tag.name} onChange={(e) => handleTagChange(tag.id, e.target.value)} />
            <button className="icon-btn" onClick={(e) => deleteHandler(tag.id, e)}>
              <span className="material-symbols-outlined">delete</span>
            </button>
            <button className="icon-btn" type="button" onClick={() => submitTagChange(tag.id)}>
              <span className="material-symbols-outlined">done</span>
            </button>
          </div>
        ))}
        <div className="btn-panel">
          <button className="btn-regular" type="button" onClick={onClose}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
}
