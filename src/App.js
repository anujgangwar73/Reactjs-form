import React from 'react'
import './App.css'
// import Button from 'react-bootstrap/Button'  
// import Header from './Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './login'
import Register from './register'
import HomePage from './homepage'
import Protected from './protected'
import Confirmation from './confirm'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>          
          <Route path="/confirm" element={<Protected Cmp={Confirmation}/>}/>
          <Route path="/homepage" element={<Protected Cmp={HomePage}/>}/>
        </Routes>
      </BrowserRouter>
    </>
  ) 
}

export default App