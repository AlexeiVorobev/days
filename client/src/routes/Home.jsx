import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "../index.css";
import uuid from "react-uuid";
import TagModal from "../components/TagModal";
import * as utils from "../utils";
import { formatISO } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getNotes, reset } from "../features/notes/noteSlice";
import Spinner from "../components/Spinner";
import NotePage from "../components/NotePage";
import NoteList from "../components/NoteList";
import { getTags } from "../features/tags/tagSlice";
import { toast } from "react-toastify";

const DEFAULT_NOTES = [
  {
    id: uuid(),
    title: "About Lorem Ipsum",
    text: `<h1>Lorem Ipsum</h1><h2>What is Lorem Ipsum?</h2><p class="ql-align-justify">
    <strong>Lorem Ipsum </strong>is simply dummy text of the printing and typesetting industry. 
    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a 
    galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
     into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
      of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like 
      Aldus PageMaker including versions of Lorem Ipsum.</p><h2>Why do we use it?</h2><p class="ql-align-justify">
      It is a long established fact that a reader will be distracted by the readable content of a page when looking 
      at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as
       opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing 
       packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' 
       will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by
        accident, sometimes on purpose (injected humour and the like).</p>`,
    date: formatISO(new Date(), { representation: "date" }),
    tagList: ["0"],
  },
];

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

    // if (!unsavedChanges) {
    //   toast.success("Saved!", {
    //     position: "top-right",
    //     autoClose: 1000,
    //     hideProgressBar: true,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
    // }

    dispatch(getNotes());
    dispatch(getTags());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  const [tagModalActive, setTagModalActive] = useState(false);

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
