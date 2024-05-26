import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Rockets from './components/Rockets';
import Navbar from './components/Navbar.js';
import Missions from './components/Missions';
import Profile from './components/Profile';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Rockets />} />
          <Route exact path="/Missions" element={<Missions />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
      </Router>
    </>);
}
export default App;