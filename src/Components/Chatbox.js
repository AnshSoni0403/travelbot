import React, { useState } from 'react';
import './Chatbox.css'; // Importing CSS for styling

const Chatbox = () => {
  const [messages, setMessages] = useState([]); // Array to store messages
  const [inputValue, setInputValue] = useState(''); // User input
  const [userPreferences, setUserPreferences] = useState({}); // Store user preferences
  const [isVisible, setIsVisible] = useState(false); // Chatbox visibility state

  // Function to handle sending user message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { sender: 'user', text: inputValue };
    setMessages((prev) => [...prev, userMessage]); // Add user's message to state
    setInputValue(''); // Clear input field

    await simulateBotResponse(inputValue); // Call the bot response function
  };

  // Simulate a bot response or fetch response from ChatGPT API
  const simulateBotResponse = async (userInput) => {
    let botResponse = '';

    // Gather user preferences and ask further questions
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
      botResponse = await getChatGPTResponse(userInput); // Fetch actual response from ChatGPT API
    }

    const botMessage = { sender: 'bot', text: botResponse };
    setMessages((prev) => [...prev, botMessage]); // Add bot message to state
  };

  // Function to fetch response from ChatGPT API
  const getChatGPTResponse = async (userInput) => {
    const data = JSON.stringify({
      messages: [
        {
          role: 'user',
          content: userInput
        }
      ],
      system_prompt: '',
      temperature: 0.7, // Set temperature for controlled responses
      top_k: 5,
      top_p: 0.9,
      max_tokens: 256,
      web_access: false
    });

    try {
      const response = await fetch('https://chatgpt-42.p.rapidapi.com/conversationgpt4-2', {
        method: 'POST',
        headers: {
          'x-rapidapi-key': '98a7d3592fmsh005053e62a969d8p1c6043jsn42114a79f26a', // Replace with your valid RapidAPI key
          'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
          'Content-Type': 'application/json',
        },
        body: data,
      });

      if (response.ok) {
        const result = await response.json();
        return result?.choices?.[0]?.message?.content || 'Sorry, I could not understand your input.';
      } else {
        console.error('API Response Error: ', response.status);
        return `API Error: ${response.status}`;
      }
    } catch (error) {
      console.error('Fetch Error: ', error);
      return `Fetch Error: ${error.message}`;
    }
  };

  // Toggle chatbox visibility
  const toggleChatbox = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className="chat-container">
      <button onClick={toggleChatbox} className="chat-btn">
        {isVisible ? 'Close Chat' : 'Chat with us'}
      </button>
      {isVisible && (
        <div className="chatbox">
          <div className="chatbox-header">
            <h2>TravelBuddy Chat</h2>
          </div>
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
