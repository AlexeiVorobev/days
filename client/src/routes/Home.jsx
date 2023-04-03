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
import {createNote} from '../features/notes/noteSlice'
import { getNotes, deleteNote, reset } from "../features/notes/noteSlice";
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

  const {notes, isLoading, isError, message} = useSelector((state) => state.notes)

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
  
  // const [notes, setNotes] = useState(
  //   localStorage.notes ? JSON.parse(localStorage.notes) : DEFAULT_NOTES
  // );

  const [tags, setTags] = useState(
    localStorage.tags
      ? JSON.parse(localStorage.tags)
      : [
          { name: "Journal", id: "0" },
          { name: "Notes", id: "1" },
        ]
  );

  const [appState, setAppState] = useState(null);
  const [activeNote, setActiveNote] = useState(null);
  const [activeTag, setActiveTag] = useState(null);
  const [checkedTags, setCheckedTags] = useState([]);
  const [activeNoteDate, setActiveNoteDate] = useState(null);

  const handleNoteOpen = function (noteId) {
    setActiveNote(noteId);
  };

  const handleDeleteNote = function (id) {
    const notesUpdated = notes.filter((note) => note.id !== id);
    dispatch(deleteNote(id))
    setAppState("noteList");
  };

  const handleCreateNote = function () {
    const newNote = {
      title: "",
      text: "",
      date: formatISO(new Date(), { representation: "date" }),
      tagList: activeTag ? [activeTag] : [],
    };
    dispatch(createNote(newNote))
    // setAppState("note");
    // setActiveNote(newNote.id);
  };

  const handleNoteDateChange = function (noteId, newDate) {
    if (!newDate) return;
    const newNotes = notes;
    newNotes.forEach((note) => {
      if (note.id === noteId) {
        note.date = newDate;
      }
      return;
    });
    newNotes.sort(utils.sortByDate);
    setNotes(newNotes);
    localStorage.setItem("notes", JSON.stringify(notes));
  };

  const handleTitleChange = function (newTitle) {
    const notesUpdated = notes.map((note) => {
      if (note.id === activeNote) {
        note.title = newTitle;
        return note;
      } else {
        return note;
      }
    });
    setNotes(notesUpdated);
  };

  function getNote(id) {
    return notes.find((note) => note.id === id);
  }

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

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

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

  const saveNote = function (id, content) {
    const noteIndex = notes.findIndex((note) => note.id === id);
    const notesUpdated = notes;
    notesUpdated[noteIndex].text = content;
    setNotes(notesUpdated);
    localStorage.setItem("notes", JSON.stringify(notes));
  };

  const handleUpdateNoteTag = function (noteId, tagId) {
    const noteIndex = notes.findIndex((note) => note.id === noteId);
    const notesUpdated = notes;
    if (notesUpdated[noteIndex].tagList.includes(tagId)) {
      notesUpdated[noteIndex].tagList = notesUpdated[noteIndex].tagList.filter(
        (id) => id !== tagId
      );
    } else {
      notesUpdated[noteIndex].tagList.push(tagId);
    }
    setNotes(notesUpdated);
    localStorage.setItem("notes", JSON.stringify(notes));
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
        note={getNote(activeNote)}
        appState={appState}
        onTitleChange={handleTitleChange}
        onDeleteNote={handleDeleteNote}
        onUpdateNoteTag={handleUpdateNoteTag}
        checkedTags={checkedTags}
        setCheckedTags={setCheckedTags}
        activeNoteDate={activeNoteDate}
        setActiveNoteDate={setActiveNoteDate}
        onNoteDateChange={handleNoteDateChange}
        setAppState={setAppState}
      />
      <Sidebar
        tags={tags}
        setTagModalActive={setTagModalActive}
        activeTag={activeTag}
        setActiveTag={setActiveTag}
        setActiveNote={setActiveNote}
        appState={appState}
        setAppState={setAppState}
        onCreateNote={handleCreateNote}
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
        note={getNote(activeNote)}
        appState={appState}
        onTitleChange={handleTitleChange}
        onDeleteNote={handleDeleteNote}
        onUpdateNoteTag={handleUpdateNoteTag}
        checkedTags={checkedTags}
        setCheckedTags={setCheckedTags}
        activeNoteDate={activeNoteDate}
        setActiveNoteDate={setActiveNoteDate}
        onNoteDateChange={handleNoteDateChange}
        setAppState={setAppState}
      />
      <Sidebar
        tags={tags}
        setTagModalActive={setTagModalActive}
        activeTag={activeTag}
        setActiveTag={setActiveTag}
        setActiveNote={setActiveNote}
        appState={appState}
        setAppState={setAppState}
        onCreateNote={handleCreateNote}
      />
      <div className="main-section">
        <MainSection
          note={getNote(activeNote)}
          activeTag={activeTag}
          notes={notes}
          tags={tags}
          onNoteOpen={handleNoteOpen}
          appState={appState}
          setAppState={setAppState}
          saveNote={saveNote}
          getTag={getTag}
          checkedTags={checkedTags}
          setCheckedTags={setCheckedTags}
          activeNoteDate={activeNoteDate}
          setActiveNoteDate={setActiveNoteDate}
          onCreateNote={handleCreateNote}
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
