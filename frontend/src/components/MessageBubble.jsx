import ProductCard from './ProductCard';

const MessageBubble = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} w-full`}>
      <div className={`max-w-xl ${isUser ? 'order-1' : 'order-2'}`}>
        
        <div className={`p-4 rounded-2xl shadow-lg border transition-colors duration-300 ${
            isUser 
              ? 'bg-et-brand text-white rounded-br-none border-red-600' 
              : 'bg-white dark:bg-neutral-800 text-et-dark dark:text-white rounded-bl-none border-gray-100 dark:border-neutral-700'
        }`}>
          <p className="text-sm leading-relaxed font-sans">{message.content}</p>
        </div>

        {!isUser && message.cardData && (
          <div className="mt-3 w-full">
            <ProductCard data={message.cardData} />
          </div>
        )}
        
      </div>
    </div>
  );
};

export default MessageBubble;