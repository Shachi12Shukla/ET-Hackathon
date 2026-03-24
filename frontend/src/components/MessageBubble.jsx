import ProductCard from './ProductCard';

const MessageBubble = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} w-full`}>
      <div className={`max-w-xl ${isUser ? 'order-1' : 'order-2'}`}>
        
        <div className={`p-4 rounded-2xl shadow-sm ${
            isUser 
              ? 'bg-et-brand text-white rounded-br-none' 
              : 'bg-white border border-gray-100 text-et-dark rounded-bl-none'
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