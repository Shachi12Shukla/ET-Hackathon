import { ExternalLink } from 'lucide-react';

const ProductCard = ({ data }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="h-32 w-full bg-et-gray overflow-hidden">
        <img 
          src={data.image || "https://economictimes.indiatimes.com/photo/98196925.cms"} 
          alt={data.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <span className="text-xs font-bold text-et-brand uppercase tracking-wide">{data.type}</span>
        <h4 className="font-serif text-base font-bold text-et-dark mt-1 leading-tight">{data.title}</h4>
        <p className="text-xs text-gray-500 mt-1 font-sans">{data.description}</p>
        
        <button className="mt-4 w-full bg-et-dark text-white text-sm px-4 py-2 rounded-full hover:bg-gray-800 transition flex items-center justify-center gap-2">
          Explore Resource <ExternalLink size={14} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;