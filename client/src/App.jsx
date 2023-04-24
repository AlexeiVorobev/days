import React from 'react'
import Dashboard from './routes/Home'
import Login from './routes/Login'
import Register from './routes/Register'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";

export default function App() {
  return (
    <div>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </HashRouter>
        <ToastContainer />
    </div>
  )
}
