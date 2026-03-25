import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';

function App() {
  const [userProfile, setUserProfile] = useState(null);
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: "Welcome to the ET Concierge. I can help you navigate the markets, plan your taxes, or find the right investment events. What's on your mind today?" 
    }
  ]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="flex h-screen bg-et-gray dark:bg-neutral-900 font-sans transition-colors duration-300">
      
      <div className={`transition-all duration-300 ease-in-out 
        bg-et-dark text-white border-r border-gray-800 shadow-lg 
        ${isSidebarOpen ? 'w-1/4 min-w-[300px]' : 'w-0 min-w-0 overflow-hidden'}`}
      >
        <Sidebar 
          userProfile={userProfile} 
          isOpen={isSidebarOpen} 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        />
      </div>

      <div className="flex-1 flex flex-col">
        <ChatWindow 
          messages={messages} 
          setMessages={setMessages} 
          setUserProfile={setUserProfile}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          theme={theme}
          toggleTheme={toggleTheme} 
        />
      </div>
    </div>
  );
}

export default App;