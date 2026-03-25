import { ExternalLink } from 'lucide-react';

const ProductCard = ({ data }) => {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden border border-gray-200 dark:border-neutral-700 shadow-lg hover:shadow-xl transition-all duration-200">
      <div className="h-32 w-full bg-et-gray dark:bg-neutral-700 overflow-hidden">
        <img 
          src={data.image || "https://economictimes.indiatimes.com/photo/98196925.cms"} 
          alt={data.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <span className="text-xs font-bold text-et-brand uppercase tracking-wide">{data.type}</span>
        <h4 className="font-serif text-base font-bold text-et-dark dark:text-white mt-1 leading-tight">{data.title}</h4>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-sans">{data.description}</p>
        
        <button className="mt-4 w-full bg-et-dark dark:bg-et-brand text-white text-sm px-4 py-2 rounded-full hover:bg-gray-800 dark:hover:bg-red-700 transition flex items-center justify-center gap-2 shadow-sm">
          Explore Resource <ExternalLink size={14} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;