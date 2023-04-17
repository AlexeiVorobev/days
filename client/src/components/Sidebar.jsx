import React from "react";
import logoUrl from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { setActiveNote, updateNote } from "../features/notes/noteSlice";
import { displayNoteList, setTagModalActive } from "../features/uiSlice";
import { setActiveTag } from "../features/tags/tagSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const tags = useSelector(state => state.tags.tags)
  const activeTag = useSelector(state => state.tags.activeTag)
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const activeNote = useSelector(state => state.notes.activeNote)

  const handleMenuTagClick = function (tag) {
    dispatch(setActiveTag(tag));
    dispatch(updateNote(activeNote))
    dispatch(displayNoteList())
  };

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  const handleMenuHomeClick = function () {
    dispatch(setActiveTag(null));
    if (activeNote) {dispatch(updateNote(activeNote))}
    dispatch(setActiveNote(null))
    dispatch(displayNoteList())
  };

  const menuTags = tags.map((tag) => (
    <div
      className={"menu-tag menu-item " + (activeTag?._id === tag._id ? "active" : "")}
      key={tag._id}
      onClick={() => handleMenuTagClick(tag)}
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
            <div
              className="profile-wrapper isUser"
              style={{ marginRight: "10px" }}
            >
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
              <span
                className="material-symbols-outlined"
                id="profile-placeholder"
              >
                person
              </span>
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
      <div
        className={"menu-item " + (activeTag ? "" : "active")}
        id="menuHomeBtn"
        onClick={handleMenuHomeClick}
      >
        <span className="material-symbols-outlined">home</span>
        Home
      </div>
      <div className="menu-tags">{menuTags}</div>
      <div
        className="menu-item"
        id="editTagsBtn"
        onClick={() => dispatch(setTagModalActive(true))}
      >
        <span className="material-symbols-outlined">edit</span>
        Edit tags
      </div>
    </div>
  );
};

export default Sidebar;
