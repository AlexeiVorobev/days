import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mainView: "noteList",
  noteDropdownState: false,
};

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
    updateNoteDropdownState(state, action) {
      state.noteDropdownState = action.payload;
    },
  },
});

export const {
  displayNoteList,
  displayNotePage,
  updateNoteDropdownState
} = uiSlice.actions;
export default uiSlice.reducer;
