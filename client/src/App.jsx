import { useEffect, useState } from "react";
import MainSection from "../components/MainSection";
import Sidebar from "../components/Sidebar";
import "./App.css";
import Header from "../components/Header";
import uuid from "react-uuid";
import TagModal from "../components/TagModal";
import * as utils from "./utils";
import { formatISO } from "date-fns";

const DEFAULT_NOTES = [
  {
    id: uuid(),
    title: "About foxes and dogs",
    body: "Quick brown fox jumps over the lazy dog.",
    date: formatISO(new Date(), { representation: "date" }),
    tagList: ["0", "1"],
  },
  {
    id: uuid(),
    title: "About foxes and dogs",
    body: "Quick brown fox jumps over the lazy dog.",
    date: "2023-01-30",
    tagList: ["0", "1"],
  },
  {
    id: uuid(),
    title: "Big dump",
    body: "Dear diary. Today I went to the bathroom and took a major shit. Damn, that was intense! Even my neighbours came down to...",
    date: "2022-12-31",
    tagList: ["0"],
  },
];

function App() {
  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : DEFAULT_NOTES
  );

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

  const handleNoteOpen = function (noteId) {
    setActiveNote(noteId);
  };

  const handleDeleteNote = function (id) {
    const notesUpdated = notes.filter(note => note.id !== id)
    setNotes(notesUpdated);
    setAppState('noteList')
  }

  const handleCreateNote = function () {
    const newNote = {
      id: uuid(),
      title: "",
      body: "New note there",
      date: formatISO(new Date(), { representation: "date" }),
      tagList: [],
    };
    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
    setAppState("note");
  };

  const handleTitleChange = function(newTitle) {

    const notesUpdated = notes.map(note => {
      if (note.id === activeNote) {
        note.title = newTitle;
        return note;
      } else {
        return note;
      }
    })
    setNotes(notesUpdated);
  }

  const getNote = function (id) {
    return notes.find((note) => note.id === id);
  };

  const getTitle = function () {
    if (activeTag) return getTag(activeTag).name;
    return "All notes";
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
    notesUpdated[noteIndex].body = content;
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

  return (
    <div className="App">
      <Header
        title={getTitle()}
        note={getNote(activeNote)}
        appState={appState}
        onTitleChange={handleTitleChange}
        onDeleteNote={handleDeleteNote}
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

export default App;
