import React from 'react'
import Dashboard from './routes/Home'
import Login from './routes/Login'
import Register from './routes/Register'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer />
    </div>
  )
}
