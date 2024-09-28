import React from 'react';
import './App.css';
import logo from './logo.png';
import Chatbox from './Components/Chatbox'; // Import the Chatbox component

const App = () => {
  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="TravelMate Logo" className="logo-img" />
          <span className="logo-text">TravelMate</span>
        </div>
        <ul className="nav-links">
          <li>Home</li>
          <li>Destinations</li>
          <li>Hotels</li>
          <li>Flights</li>
        </ul>
        <Chatbox /> {/* Include the Chatbox component here */}
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="chat-bubble bubble-1">
          <p>Explore Your Next Adventure</p>
        </div>
        <div className="chat-bubble bubble-2">
          <p>Find exciting places to visit.</p>
        </div>
        <div className="chat-bubble bubble-3">
          <p>Plan and book with ease.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-section">
          <h4>Terms of Service</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className="footer-section">
          <h4>Hotels</h4>
          <p>Find top-rated hotels at great prices.</p>
        </div>
        <div className="footer-section">
          <h4>Privacy</h4>
          <p>Your privacy is our top concern.</p>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Have any questions? Reach out to us anytime!</p>
          <button className="footer-btn">Agree</button>
        </div>
      </footer>
    </div>
  );
};

export default App;
