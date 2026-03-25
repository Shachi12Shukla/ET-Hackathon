import { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import InputBar from './InputBar';
import { PanelLeftOpen, Sparkles, Sun, Moon } from 'lucide-react';

const ChatWindow = ({ messages, setMessages, setUserProfile, isSidebarOpen, toggleSidebar, theme, toggleTheme }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (text) => {
    const newUserMsg = { role: 'user', content: text };
    setMessages(prev => [...prev, newUserMsg]);

    setTimeout(() => {
      const mockResponse = getMockResponse(text);
      setMessages(prev => [...prev, mockResponse.msg]);
      if(mockResponse.profile) {
        setUserProfile(prev => ({ ...prev, ...mockResponse.profile }));
      }
    }, 1000);
  };

  return (
    <div className="relative flex flex-col h-full bg-white dark:bg-neutral-900 shadow-xl transition-colors duration-300">
      
      {!isSidebarOpen && (
        <button 
          onClick={toggleSidebar}
          className="absolute top-4 left-4 z-20 text-gray-500 dark:text-gray-400 hover:text-et-brand dark:hover:text-et-brand transition-colors bg-white dark:bg-neutral-800 p-2 rounded-full shadow-md border border-gray-200 dark:border-gray-700"
        >
          <PanelLeftOpen size={22} />
        </button>
      )}

      <div className="bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-gray-800 w-full shadow-sm">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          
          <div className={`text-left ${!isSidebarOpen ? 'ml-12' : ''}`}>
            <h2 className="text-2xl font-serif font-bold text-et-dark dark:text-white tracking-tight">
              Intelligent Assistant
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Powered by ET AI
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={toggleTheme}
              className="relative w-10 h-10 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center transition-all duration-500 hover:scale-110 shadow-sm"
            >
              <Sun className={`absolute w-5 h-5 text-yellow-500 transition-all duration-500 ${theme === 'dark' ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`} />
              <Moon className={`absolute w-5 h-5 text-blue-400 transition-all duration-500 ${theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`} />
            </button>

            <div className="hidden sm:flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-gray-700 px-3 py-1.5 rounded-full">
              <Sparkles size={12} className="text-et-brand" />
              <span>Experimental AI</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto w-full bg-et-gray/30 dark:bg-neutral-900">
        <div className="max-w-3xl mx-auto w-full px-6 py-6 space-y-6">
          {messages.map((msg, idx) => (
            <MessageBubble key={idx} message={msg} />
          ))}
          <div ref={scrollRef} />
        </div>
      </div>
      
      <div className="bg-white dark:bg-neutral-900 border-t border-gray-100 dark:border-gray-800 w-full py-4 shadow-2xl">
        <div className="max-w-3xl mx-auto w-full px-6">
          <InputBar onSend={handleSend} />
        </div>
      </div>
    </div>
  );
};

const getMockResponse = (text) => {
  let msg = { role: 'assistant', content: "I'm processing your request..." };
  let profile = null;

  if (text.includes("tax")) {
    msg = { 
      role: 'assistant', 
      content: "Great choice. Tax planning is essential. I found a highly rated article and a tool for you.",
      cardData: {
        type: "ET Prime",
        title: "Ultimate Guide to ELSS Funds for 2024",
        description: "Save tax while building long term wealth.",
        image: "https://img.etimg.com/photo/98196925.cms"
      }
    };
    profile = { interests: "Tax Saving", riskAppetite: "Moderate", status: "Tax Planner" };
  } else if (text.includes("IPO")) {
    msg = { 
      role: 'assistant', 
      content: "IPOs are buzzing right now! Here is the latest analysis.",
      cardData: {
        type: "Live Market",
        title: "Top 3 IPOs to Watch This Week",
        description: "Analysis of upcoming public issues and grey market premiums.",
        image: "https://img.etimg.com/photo/98196925.cms"
      }
    };
    profile = { interests: "IPOs & New Listings", riskAppetite: "High", status: "Active Trader" };
  }

  return { msg, profile };
};

export default ChatWindow;