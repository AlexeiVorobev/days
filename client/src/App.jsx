import React from 'react'
// import './app.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Dashboard from './app/routes/Home'
import Login from './app/routes/Login'
import Register from './app/routes/Register'

export default function App() {
  return (
    <div>
        <Routes>
          <Route path='/' element={<Dashboard/>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
    </div>
  )
}