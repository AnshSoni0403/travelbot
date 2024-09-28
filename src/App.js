import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import Home from './Components/Home/Home'; // Create a Home component
import ChatboxPage from './Components/Chatbox'; // Create a ChatboxPage component

const App = () => {
  return (
    <Router>
      <div className="container">
        <Routes>
          {/* Define routes for Home and Chatbox */}
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<ChatboxPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
