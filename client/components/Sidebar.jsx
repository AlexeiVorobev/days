import React from "react";

const Sidebar = ({ tags, setTagModalActive }) => {
  const menuTags = tags.map((tag) => (
    <div className="menu-tag menu-item" key={tag.id}>
      <span style={{ color: tag.color }} className="material-symbols-outlined">
        label
      </span>
      {tag.name}
    </div>
  ));

  return (
    <div className="sidebar">
      <div className="menu-item" id="menuNewNote">
        <span className="material-symbols-outlined">add_notes</span>
        New note
      </div>
      <div className="menu-item" id="menu-home">
        <span className="material-symbols-outlined">home</span>
        Home
      </div>
      <div className="menu-tags">{menuTags}</div>
      <button type="button" className="menu-item" id="editTags" onClick={() => setTagModalActive(true)}>
        <span className="material-symbols-outlined">edit</span>
        Edit tags
      </button>
    </div>
  );
};

export default Sidebar;
