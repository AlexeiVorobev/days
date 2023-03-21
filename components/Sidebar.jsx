import React from "react";
import logoUrl from "../src/assets/days-logo-white.svg";

const Sidebar = ({
  tags,
  setTagModalActive,
  activeTag,
  setActiveTag,
  setActiveNote,
  appState,
  setAppState,
  onCreateNote,

}) => {
  const handleMenuTagClick = function (id) {
    setActiveTag(id);
    setActiveNote(null);
    setAppState('tag')
  };

  const handleNewNoteClick = function () {
    onCreateNote();
  };

  const handleMenuHomeClick = function () {
    setActiveTag(null);
    setActiveNote(null);
    setAppState('home');
  };

  const menuTags = tags.map((tag) => (
    <div
      className={"menu-tag menu-item " + (activeTag === tag.id ? "active" : "")}
      key={tag.id}
      onClick={() => handleMenuTagClick(tag.id)}
    >
      <span className="material-symbols-outlined">label</span>
      {tag.name}
    </div>
  ));

  return (
    <div className="sidebar">
      <div className="logo">
        {/* <img src={logoUrl} alt="" /> */}
        Days
      </div>
      <div className="menu-item" id="menuNewNote" onClick={handleNewNoteClick}>
        <span className="material-symbols-outlined">add_notes</span>
        New note
      </div>
      <div
        className={"menu-item " + (activeTag ? "" : "active")}
        id="menuHome"
        onClick={handleMenuHomeClick}
      >
        <span className="material-symbols-outlined">home</span>
        Home
      </div>
      <div className="menu-tags">{menuTags}</div>
      <div
        className="menu-item"
        id="editTags"
        onClick={() => setTagModalActive(true)}
      >
        <span className="material-symbols-outlined">edit</span>
        Edit tags
      </div>
    </div>
  );
};

export default Sidebar;
