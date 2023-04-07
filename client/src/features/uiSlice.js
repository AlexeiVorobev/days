import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mainView: "noteList"
}

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
      displayNoteList(state) {
        state.mainView = "noteList";
      },
      displayNotePage(state) {
        state.mainView = "note";
      },
    },
  });
  
  export const { displayNoteList, displayNotePage } = uiSlice.actions;
  export default uiSlice.reducer;