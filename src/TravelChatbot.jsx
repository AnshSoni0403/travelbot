import React, { useState, useEffect } from 'react';
import { MessageSquare, Plane, Map, Calendar, User, Menu, Sun, Moon, Send, Globe, Compass, Sunrise, Umbrella, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TravelChatbot = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [darkMode, setDarkMode] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [destination, setDestination] = useState('');

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const tabs = [
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
    { id: 'discover', icon: Compass, label: 'Discover' },
    { id: 'itinerary', icon: Map, label: 'Itinerary' },
    { id: 'flights', icon: Plane, label: 'Flights' },
    { id: 'weather', icon: Umbrella, label: 'Weather' },
  ];

  const sendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { text: inputMessage, sender: 'user' }]);
      setInputMessage('');
      // Simulate bot response
      setTimeout(() => {
        setMessages(prev => [...prev, { text: "Great! I'd be happy to help you plan your trip. Where would you like to go?", sender: 'bot' }]);
      }, 1000);
    }
  };

  return (
<div className={`flex h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-blue-50'} transition-colors duration-300`}>
  {/* Sidebar */}
  <motion.div
    initial={{ x: -100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="w-20 bg-white dark:bg-gray-800 shadow-md"
  >
        <div className="flex flex-col items-center py-4">
          <Globe className="text-blue-500 mb-4" size={32} />
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`p-3 mb-4 rounded-full ${
                activeTab === tab.id 
                  ? 'bg-gradient-to-r from-blue-400 to-teal-400 text-white' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={24} />
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <motion.header 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 shadow-sm p-4"
        >
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">TravelMate</h1>
            <div className="flex items-center">
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className="mr-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
              >
                {darkMode ? <Sun size={24} /> : <Moon size={24} />}
              </button>
              <button className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
                <User size={24} />
              </button>
            </div>
          </div>
        </motion.header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'chat' && <ChatInterface messages={messages} inputMessage={inputMessage} setInputMessage={setInputMessage} sendMessage={sendMessage} />}
              {activeTab === 'discover' && <DiscoverInterface />}
              {activeTab === 'itinerary' && <ItineraryPlanner destination={destination} />}
              {activeTab === 'flights' && <FlightSearch />}
              {activeTab === 'weather' && <WeatherForecast destination={destination} />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

const ChatInterface = ({ messages, inputMessage, setInputMessage, sendMessage }) => (
    <div>
      <div className="h-full flex flex-col">
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4 overflow-y-auto">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
            >
              <span className={`inline-block p-3 rounded-lg ${
                message.sender === 'user' 
                  ? 'bg-gradient-to-r from-blue-400 to-teal-400 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
              }`}>
                {message.text}
              </span>
            </motion.div>
          ))}
        </div>
        <div className="flex items-center">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask about your next adventure..."
            className="flex-1 p-3 rounded-l-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button 
            onClick={sendMessage}
            className="bg-gradient-to-r from-blue-400 to-teal-400 text-white p-3 rounded-r-lg hover:from-blue-500 hover:to-teal-500"
          >
            <Send size={24} />
          </button>
        </div>
      </div>
    </div>
  );

const DiscoverInterface = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
    <h2 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Discover New Destinations</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {['Paris', 'Tokyo', 'New York', 'Bali', 'Rome', 'Sydney'].map((city) => (
  <div key={city} className="relative overflow-hidden rounded-lg shadow-md group">
    <img src={`/api/placeholder/400/300`} alt={city} className="w-full h-48 object-cover" />
    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
    <div className="absolute bottom-0 left-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <h3 className="text-lg font-semibold">{city}</h3>
    </div>
  </div>
))}

    </div>
  </div>
);

const ItineraryPlanner = ({ destination }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
    <h2 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Itinerary Planner</h2>
    <div className="mb-4">
      <label htmlFor="destination" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Destination</label>
      <input
        type="text"
        id="destination"
        value={destination}
        placeholder="Where are you going?"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
      />
    </div>
    <div className="space-y-4">
      {['Day 1', 'Day 2', 'Day 3'].map((day) => (
        <div key={day} className="border-l-4 border-blue-400 pl-4">
          <h3 className="font-semibold text-lg">{day}</h3>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>Visit local attractions</li>
            <li>Try authentic cuisine</li>
            <li>Explore the city</li>
          </ul>
        </div>
      ))}
    </div>
  </div>
);

const FlightSearch = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
    <h2 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Flight Search</h2>
    <form className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="from" className="block text-sm font-medium text-gray-700 dark:text-gray-300">From</label>
          <input type="text" id="from" placeholder="Departure city" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
        </div>
        <div>
          <label htmlFor="to" className="block text-sm font-medium text-gray-700 dark:text-gray-300">To</label>
          <input type="text" id="to" placeholder="Arrival city" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="departure" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Departure Date</label>
          <input type="date" id="departure" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
        </div>
        <div>
          <label htmlFor="return" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Return Date</label>
          <input type="date" id="return" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
        </div>
      </div>
      <button type="submit" className="w-full bg-gradient-to-r from-blue-400 to-teal-400 text-white p-2 rounded-md hover:from-blue-500 hover:to-teal-500">Search Flights</button>
    </form>
  </div>
);

const WeatherForecast = ({ destination }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
    <h2 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Weather Forecast for {destination || 'Your Destination'}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {['Today', 'Tomorrow', 'Day After'].map((day) => (
        <div key={day} className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg text-center">
          <h3 className="font-semibold">{day}</h3>
          <Sunrise className="mx-auto my-2" size={32} />
          <p className="text-2xl font-bold">75°F</p>
          <p>Sunny</p>
        </div>
      ))}
    </div>
  </div>
);

export default TravelChatbot;