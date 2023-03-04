import { useEffect, useState } from "react";
import MainSection from "../components/MainSection";
import Sidebar from "../components/Sidebar";
import "./App.css";
import Header from "../components/Header";
import uuid from "react-uuid";
import TagModal from "../components/TagModal";
import * as utils from "./utils";

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

  const [tags, setTags] = useState(
    localStorage.tags
      ? JSON.parse(localStorage.tags)
      : [
          { name: "Journal", id: "0" },
          { name: "Notes", id: "1" },
        ]
  );

  useEffect(() => {
    localStorage.setItem('tags', JSON.stringify(tags))
  }, [tags]);

  const [tagModalActive, setTagModalActive] = useState(false);

  const handleAddTag = (newTag) => {
    if (!newTag.name) return;
    newTag.id = uuid();
    const tagsUpdated = [...tags, newTag].sort(utils.sortTags);
    setTags(tagsUpdated);
  };

  const handleDeleteTag = function (idToDelete) {
    setTags(tags.filter((tag) => tag.id !== idToDelete));
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
