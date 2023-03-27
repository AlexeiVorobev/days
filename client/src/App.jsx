import React from 'react'
// import './app.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Dashboard from './app/pages/Dashboard'
import Login from './app/pages/Login'
import Register from './app/pages/Register'

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/days/' element={<Dashboard/>} />
          <Route path='/days/login' element={<Login />} />
          <Route path='/days/register' element={<Register />} />
        </Routes>
      </Router>
    </div>
  )
}
