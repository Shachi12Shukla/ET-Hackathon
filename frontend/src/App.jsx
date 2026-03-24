import { useState } from 'react';
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

  return (
    <div className="flex h-screen bg-et-gray font-sans">
      
      <div className={`transition-all duration-300 ease-in-out bg-et-dark text-white border-r border-gray-800 
        ${isSidebarOpen ? 'w-1/4 min-w-[300px]' : 'w-0 min-w-0 overflow-hidden'}`}
      >
        <Sidebar 
          userProfile={userProfile} 
          isOpen={isSidebarOpen} 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        />
      </div>

      <div className="flex-1 flex flex-col bg-white">
        <ChatWindow 
          messages={messages} 
          setMessages={setMessages} 
          setUserProfile={setUserProfile}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        />
      </div>
    </div>
  );
}

export default App;