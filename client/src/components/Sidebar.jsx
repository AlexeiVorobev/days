import React from "react";
import logoUrl from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleMenuTagClick = function (id) {
    setActiveTag(id);
    setActiveNote(null);
    setAppState("tag");
  };

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  const handleNewNoteClick = function () {
    onCreateNote();
  };

  const handleMenuHomeClick = function () {
    setActiveTag(null);
    setActiveNote(null);
    setAppState("home");
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
      <div className="header-login">
        {user ? (
          <>
            <div className="profile-wrapper isUser" style={{ marginRight: "10px" }}>
              <span className="profile-letter">{user.email[0]}</span>
            </div>
            <span
            className="link"
              style={{
                maxWidth: "65%",
                overflow: "hidden",
                fontSize: "0.85rem",
                marginRight: "8px",
              }}
            >
              {user.email}
            </span>
            <button
              className="icon-btn"
              style={{ backgroundColor: "rgba(0,0,0,0" }}
              onClick={onLogout}
            >
              <span
                className="material-symbols-outlined "
                style={{
                  fontSize: "1rem",
                  position: "relative",
                  top: "3px",
                }}
              >
                logout
              </span>
            </button>
          </>
        ) : (
          <>
            <div className="profile-wrapper" style={{ marginRight: "10px" }}>
              <span className="material-symbols-outlined" id="profile-placeholder">person</span>
            </div>
            <Link to={"/login"}>
              Login
              <span
                className="material-symbols-outlined "
                style={{
                  fontSize: "1rem",
                  position: "relative",
                  top: "3px",
                }}
              >
                login
              </span>
            </Link>
          </>
        )}
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
