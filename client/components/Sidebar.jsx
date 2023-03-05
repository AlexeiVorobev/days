import React from "react";

const Sidebar = ({ tags, setTagModalActive, activeTag, setActiveTag }) => {

  const handleMenuTagClick = function (id) {
    setActiveTag(id)
  }

  const menuTags = tags.map((tag) => (
    <div className={"menu-tag menu-item " + (activeTag === tag.id ? 'active' : '')} key={tag.id} onClick={() => handleMenuTagClick(tag.id)}>
      <span className="material-symbols-outlined">
        label
      </span>
      {tag.name}
    </div>
  ));

  return (
    <div className="sidebar">
      <div className="logo">
        <span className="material-symbols-outlined logo-picture">library_books</span>
        <div className="logo-title">Days</div>
      </div>
      <div className="menu-item" id="menuNewNote">
        <span className="material-symbols-outlined">add_notes</span>
        New note
      </div>
      <div className={"menu-item " + (activeTag ? '' : "active")} id="menuHome" onClick={() => setActiveTag(null)}>
        <span className="material-symbols-outlined">home</span>
        Home
      </div>
      <div className="menu-tags">{menuTags}</div>
      <div className="menu-item" id="editTags" onClick={() => setTagModalActive(true)}>
        <span className="material-symbols-outlined">edit</span>
        Edit tags
      </div>
    </div>
  );
};

export default Sidebar;
