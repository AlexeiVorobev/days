import React from "react";
import NoteList from "./NoteList";
import NotePage from "./NotePage";
import { useSelector } from "react-redux";

const MainSection = ({
  activeTag,
  tags,
  getTag,
}) => {
  const mainView = useSelector(state => state.ui.mainView)
  
  if (mainView === "note") {
    return (
      <NotePage
        getTag={getTag}
      />
    );
  } else {
    return (
      <div className="main-container">
        <NoteList
          activeTag={activeTag}
          tags={tags}
          getTag={getTag}
        />
      </div>
    );
  }
};

export default MainSection;
