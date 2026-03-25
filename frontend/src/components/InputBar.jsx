import { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

const InputBar = ({ onSend }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText('');
  };

  const suggestions = ["Plan my taxes", "Find upcoming IPOs", "Latest Market News"];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex gap-2 mb-3 justify-center flex-wrap">
        {suggestions.map((sug) => (
          <button 
            key={sug} 
            onClick={() => onSend(sug)}
            className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-gray-300 text-xs px-4 py-1.5 rounded-full hover:border-et-brand hover:text-et-brand transition-colors shadow-sm"
          >
            <Sparkles size={12} className="inline mr-1 text-et-brand" />
            {sug}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 border-2 border-gray-300 dark:border-neutral-700 rounded-full px-6 py-2 focus-within:border-et-brand transition-all duration-200 bg-white dark:bg-neutral-800 shadow-lg hover:shadow-xl">
        <input 
          type="text" 
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask me anything about finance..."
          className="flex-1 outline-none text-sm bg-transparent text-et-dark dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
        />
        <button 
          onClick={handleSend} 
          className="bg-et-brand text-white p-2.5 rounded-full hover:bg-red-700 transition-colors shadow-md"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export default InputBar;