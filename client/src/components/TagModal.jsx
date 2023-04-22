import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { displayNoteList, setTagModalActive } from "../features/uiSlice";
import uuid from "react-uuid";
import * as utils from "../utils";
import { setActiveTag, updateTags } from "../features/tags/tagSlice";

export default function TagModal() {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.ui.tagModalActive);
  const tags = useSelector((state) => state.tags.tags);
  const activeTag = useSelector((state) => state.tags.activeTag);

  const [newTags, setNewTags] = useState(tags)
  const [newTagName, setNewTagName] = useState("")
  const newTagRef = useRef()

  useEffect(() => {
    setNewTags([...tags])
  }, [isActive])

  if (!isActive) {
    return "";
  }

  const onSave = () => {
    dispatch(updateTags(newTags))
    dispatch(setTagModalActive(false))
  }

  const onAddTag = () => {
    if (!newTagName) return;
    const newTag = {_id: uuid(), name: newTagName}
    const tagsUpdated = [...tags, newTag].sort(utils.sortTags);
    setNewTags(tagsUpdated);
    setNewTagName("")
  };

  const onClose = () => {
    setNewTags([...tags])
    dispatch(setTagModalActive(false))
  }

  const onTagChange = function (id, newName) {
    const updatedTags = newTags.map((tag) => {
      if (tag._id === id) {
        return { _id: id, name: newName };
      } else {
        return tag;
      }
    });
    setNewTags(updatedTags)
  };

  const onDelete = async function (idToDelete) {
    if (
      confirm(
        "Tag will be deleted. It will be removed from all note instances."
      )
    ) {
      dispatch(setActiveTag(null))
      dispatch(displayNoteList)
      const updatedTags = newTags.filter((tag) => tag._id !== idToDelete)
      setNewTags(updatedTags);
      dispatch(updateTags(updatedTags))
      dispatch(setTagModalActive(false))
    }
  };

  function onOverlayClick(e) {
    if (e.target.classList.contains("overlay")) {
      onClose()
    }
  }

  return (
    <div className="overlay" onClick={(e) => onOverlayClick(e)}>
      <form className="modal">
        <h1>Edit tags</h1>
        <div className="modal-tag">
          <button
            className="icon-btn"
            type="button"
            onClick={() => (newTagRef.current.value = "")}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          <input
          ref={newTagRef}
            type="text"
            id="newTagNameField"
            autoComplete="off"
            placeholder="Create tag"
            autoFocus
            value={newTagName}
            onChange={e => setNewTagName(e.target.value)}
          />
          <button type="button" className="icon-btn" onClick={onAddTag}>
            <span className="material-symbols-outlined">done</span>
          </button>
        </div>
        {newTags.map((tag) => (
          <div className="modal-tag" key={tag._id}>
            <button className="icon-btn">
              <span className="material-symbols-outlined">label</span>
            </button>
            <input
              type="text"
              value={tag.name}
              onChange={(e) => onTagChange(tag._id, e.target.value)}
            />
            <button
              className="icon-btn"
              type="button"
              onClick={() => onDelete(tag._id)}
            >
              <span className="material-symbols-outlined">delete</span>
            </button>
          </div>
        ))}
        <div className="btn-panel">
          <button
            className="btn-regular"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
          className="btn-special"
          type="button"
          onClick={onSave}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
