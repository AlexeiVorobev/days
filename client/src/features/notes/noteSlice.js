import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import noteService from "./noteService";

const initialState = {
    notes: [],
    activeNote: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    unsavedChanges: true
}

export const createNote = createAsyncThunk('notes/create', async(noteData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await noteService.createNote(noteData, token)
    } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// Get user notes from server
export const getNotes = createAsyncThunk('notes/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const notes = await noteService.getNotes(token)
        return notes;
    } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
})

// Delete note
export const deleteNote = createAsyncThunk('notes/delete', async(id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await noteService.deleteNote(id, token)
    } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const updateNote = createAsyncThunk('notes/update', async(note, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await noteService.updateNote(note, token)
    } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        reset: (state) => {initialState},
        setActiveNote: (state, action) => {
            state.activeNote = action.payload;
        },
        setUnsavedChanges(state, action) {
            state.unsavedChanges = action.payload
          }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createNote.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createNote.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.notes.push(action.payload)
            state.activeNote = action.payload
        })
        .addCase(createNote.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getNotes.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getNotes.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.notes = action.payload
        })
        .addCase(getNotes.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(deleteNote.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteNote.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.notes = state.notes.filter((note) => note._id !== action.payload.id)
        })
        .addCase(deleteNote.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(updateNote.pending, (state) => {
            state.isLoading = true
        })
        .addCase(updateNote.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false // clear any previous errors
            state.unsavedChanges = false
            const updatedNote = action.payload
            const index = state.notes.findIndex((n) => n._id === updatedNote._id)
            if (index !== -1) {
                state.notes[index] = updatedNote
            }
        })
        .addCase(updateNote.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const {reset, setUnsavedChanges} = noteSlice.actions
export default noteSlice.reducer
export const setActiveNote = createAction('note/setActiveNote');