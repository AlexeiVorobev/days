import { useEffect, useState } from "react";
import MainSection from "../components/MainSection";
import Sidebar from "../components/Sidebar";
import "../App.css";
import Header from "../components/Header";
import uuid from "react-uuid";
import TagModal from "../components/TagModal";
import * as utils from "../utils";
import { formatISO } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getNotes, reset } from "../features/notes/noteSlice";
import Spinner from '../components/Spinner'

const DEFAULT_NOTES = [
  {
    id: uuid(),
    title: "About foxes and dogs",
    text: `<h1>Foxes and dogs</h1><p>Quick brown fox jumps over the lazy dog.</p><h2>Manual</h2><ol>
    <li>Find a fox</li><li>Find a dog</li><li>Jump fox over the dog</li></ol>`,
    date: formatISO(new Date(), { representation: "date" }),
    tagList: ["1"],
  },
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

  const { isLoading, isError, message} = useSelector((state) => state.notes)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    
    if (!user) {
      navigate('/login')
    }

    dispatch(getNotes())

    return () => {
      dispatch(reset())
    }
    
  }, [user, navigate, isError, message, dispatch])

  const [tags, setTags] = useState(
    localStorage.tags
      ? JSON.parse(localStorage.tags)
      : [
          { name: "Journal", id: "0" },
          { name: "Notes", id: "1" },
        ]
  );
  const [activeTag, setActiveTag] = useState(null);

  const getTitle = function () {
    if (activeTag) return getTag(activeTag).name;
    return "Timeline";
  };

  const getTag = function (id) {
    return tags.find((tag) => tag.id === id);
  };

  useEffect(() => {
    localStorage.setItem("tags", JSON.stringify(tags));
  }, [tags]);

  const [tagModalActive, setTagModalActive] = useState(false);

  const handleAddTag = (newTag) => {
    if (!newTag.name) return;
    newTag.id = uuid();
    const tagsUpdated = [...tags, newTag].sort(utils.sortTags);
    setTags(tagsUpdated);
  };

  const handleDeleteTag = function (idToDelete) {
    if (idToDelete === activeTag) {
      setActiveTag(null);
    }
    setAppState("noteList");
    setTags(tags.filter((tag) => tag.id !== idToDelete));
    const notesUpdated = notes.map((note) => {
      note.tagList = note.tagList.filter((id) => id !== idToDelete);
      return note;
    });
    setNotes(notesUpdated);
  };

  const handleUpdateTag = function (tagUpdated) {
    const tagsUpdated = tags.map((tag) => {
      if (tag.id === tagUpdated.id) {
        return tagUpdated;
      } else {
        return tag;
      }
    });
    tagsUpdated.sort(utils.sortTags);
    setTags(tagsUpdated);
  };

  if (isLoading) {
    return (
      <div className="App">
      <Header
        tags={tags}
        title={getTitle()}
      />
      <Sidebar
        tags={tags}
        setTagModalActive={setTagModalActive}
        activeTag={activeTag}
        setActiveTag={setActiveTag}
      />
      <div className="main-section">
        <Spinner />
      </div>
    </div>
    )
  }

  return (
    <div className="App">
      <Header
        tags={tags}
        title={getTitle()}
      />
      <Sidebar
        tags={tags}
        setTagModalActive={setTagModalActive}
        activeTag={activeTag}
        setActiveTag={setActiveTag}
      />
      <div className="main-section">
        <MainSection
          activeTag={activeTag}
          tags={tags}
          getTag={getTag}
        />
      </div>
      <TagModal
        onDeleteTag={handleDeleteTag}
        tags={tags}
        isActive={tagModalActive}
        onClose={() => setTagModalActive(false)}
        onAddTag={handleAddTag}
        onUpdateTag={handleUpdateTag}
      />
    </div>
  );
}

export default Dashboard;
