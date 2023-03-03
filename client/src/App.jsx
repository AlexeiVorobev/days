import { useState } from "react";
import MainSection from "../components/MainSection";
import Sidebar from "../components/Sidebar";
import "./App.css";
import Header from "../components/Header";
import uuid from "react-uuid";
import TagModal from "../components/TagModal";

function App() {
  const [notes, setNotes] = useState([
    {
      id: uuid(),
      title: "Sample note",
      body: "Quick brown fox jumps over the lazy dog.",
      date: Date.now(),
      tagList: ["0"],
    },
  ]);

  const [tags, setTags] = useState([
    { name: "Journal", color: "gray", id: "0" },
    { name: "Notes", color: "#ff3333", id: "1" },
  ]);

  const [tagModalActive, setTagModalActive] = useState(false);

  const handleAddTag = (newTag) => {
    newTag.id = uuid();
    setTags([newTag, ...tags]);
  };

  const handleDeleteTag = function (idToDelete) {
    setTags(tags.filter(tag => tag.id !== idToDelete))
  }

  const handleUpdateTag = function (tagUpdated) {
    const tagsUpdated = tags.map((tag) => {
      if (tag.id === tagUpdated.id) {
        return tagUpdated
      } else {
        return tag
      }
    })
  }
  
  return (
    <div className="App">
      <Header />
      <Sidebar tags={tags} setTagModalActive={setTagModalActive} />
      <MainSection />
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
