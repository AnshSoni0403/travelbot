import React, { useState } from 'react';
import axios from 'axios';
import './Chatbox.css'; // Create this file for styling

const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [userPreferences, setUserPreferences] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { sender: 'user', text: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    await simulateBotResponse(inputValue);
  };

  const simulateBotResponse = async (userInput) => {
    let botResponse = '';

    // Dynamic Questioning
    if (!userPreferences.destination) {
      botResponse = 'What is your preferred travel destination?';
      setUserPreferences((prev) => ({ ...prev, destination: userInput }));
    } else if (!userPreferences.travelDates) {
      botResponse = 'What are your travel dates?';
      setUserPreferences((prev) => ({ ...prev, travelDates: userInput }));
    } else if (!userPreferences.preferences) {
      botResponse = 'What type of trip are you looking for? (e.g., budget, luxury)';
      setUserPreferences((prev) => ({ ...prev, preferences: userInput }));
    } else {
      botResponse = await fetchDestinationInfo(userInput);
    }

    const botMessage = { sender: 'bot', text: botResponse };
    setMessages((prev) => [...prev, botMessage]);
  };

  const fetchDestinationInfo = async (userInput) => {
    // Simulate an API call; replace this with actual API code
    return `Information about ${userInput}`;
  };

  const toggleChatbox = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div>
      <button onClick={toggleChatbox} className="chat-btn">
        {isVisible ? 'Close Chat' : 'Chat'}
      </button>
      {isVisible && (
        <div className="chatbox-container">
          <div className="chatbox-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <form className="chatbox-input" onSubmit={handleSendMessage}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbox;
