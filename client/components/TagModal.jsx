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

  const [newTag, setNewTag] = useState({});
  const [tagUpdated, setTagUpdated] = useState({});

  return (
    <div className="overlay">
      <form className="modal">
        <h1>Edit tags</h1>
        <div className="modal-tag">
          <button className="icon-btn">
            <button className="icon-btn">
              <span className="material-symbols-outlined">close</span>
            </button>
          </button>
          <input
            type="text"
            id="newTagNameField"
            placeholder="Create tag"
            autoFocus
            onChange={(e) => {
              setNewTag({
                ...newTag,
                name: e.target.value,
              });
            }}
          />
          <button
            type="button"
            className="icon-btn"
            onClick={() => onAddTag(newTag)}
          >
            <span className="material-symbols-outlined">done</span>
          </button>
        </div>
        {tags.map((tag) => (
          <div className="modal-tag" key={tag.id}>
            <button className="icon-btn">
              <span
                style={{ color: tag.color }}
                className="material-symbols-outlined"
              >
                label
              </span>
            </button>
            <input type="text" value={tag.name} />
            <button className="icon-btn" onClick={() => onDeleteTag(tag.id)}>
              <span className="material-symbols-outlined">delete</span>
            </button>
            <button className="icon-btn" type="button" onClick={() => onUpdateTag(tagUpdated)}>
              <span className="material-symbols-outlined">done</span>
            </button>
          </div>
        ))}
        <div className="btn-panel">
          <button className="btn-regular" type="button" onClick={onClose}>
            Done
          </button>
        </div>
      </form>
    </div>
  );
}
