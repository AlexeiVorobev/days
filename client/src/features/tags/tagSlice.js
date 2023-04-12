import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import tagService from "./tagService";

const initialState = {
    tags: [],
    activeTag: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Get user tags from server
export const getTags = createAsyncThunk('tags/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const tags = await tagService.getTags(token)
        return tags;
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

export const updateTags = createAsyncThunk('tags/update', async(tags, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await tagService.updateTags(tags, token)
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

export const tagSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {
        reset: (state) => {initialState},
        setActiveTag: (state, action) => {
            state.activeTag = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getTags.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getTags.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.tags = action.payload
        })
        .addCase(getTags.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(updateTags.pending, (state) => {
            state.isLoading = true
        })
        .addCase(updateTags.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false // clear any previous errors
            const updatedTags = action.payload
            state.tags = updatedTags
        })
        .addCase(updateTags.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const {reset} = tagSlice.actions
export default tagSlice.reducer
export const setActiveTag = createAction('tags/setActiveTag');