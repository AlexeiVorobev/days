import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import noteReducer from '../features/notes/noteSlice'
import uiReducer from '../features/uiSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notes: noteReducer,
    ui: uiReducer
  },
})