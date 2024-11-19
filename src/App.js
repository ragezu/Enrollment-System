// src/App.js
import React from 'react';
import Login from './Login';
import Register from './Register';
import Landingpage from './Landingpage';
import './style.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    );
}

export default App;
