import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "../index.css";
import TagModal from "../components/TagModal";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getNotes, reset } from "../features/notes/noteSlice";
import Spinner from "../components/Spinner";
import NotePage from "../components/NotePage";
import NoteList from "../components/NoteList";
import { getTags } from "../features/tags/tagSlice";

function Dashboard() {
  const { isLoading, isError, message } = useSelector((state) => state.notes);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const mainView = useSelector((state) => state.ui.mainView);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }
    dispatch(getNotes());
    dispatch(getTags());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  return (
    <div>
      <Overlay />
      <ToggleBtn />
      <main>
        <Sidebar />
        <div className="main-container">
          {isLoading && <Spinner />}
          {mainView === "note" ? <NotePage /> : <NoteList />}
        </div>
      </main>
      <TagModal />
    </div>
  );
}

const toggleMenu = function () {
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".sidebar-overlay");
  if (!overlay.classList.contains("active")) {
    sidebar.classList.add("active");
    overlay.classList.add("active");
  } else {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  }
};

function Overlay() {
  return <div className="sidebar-overlay" onClick={toggleMenu}></div>;
}

function ToggleBtn() {
  return (
    <button className="toggle-sidebar-btn" onClick={toggleMenu}>
      <span className="material-symbols-outlined black header-btn">menu</span>
    </button>
  );
}

export default Dashboard;
