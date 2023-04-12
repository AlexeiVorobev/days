import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import noteReducer from '../features/notes/noteSlice'
import uiReducer from '../features/uiSlice'
import tagReducer from '../features/tags/tagSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notes: noteReducer,
    ui: uiReducer,
    tags: tagReducer
  },
})