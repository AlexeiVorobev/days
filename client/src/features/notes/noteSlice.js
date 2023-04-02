import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
    notes: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        reset: (state) => {initialState}
    }
})

export const {reset} = noteSlice.actions
export default noteSlice.reducer