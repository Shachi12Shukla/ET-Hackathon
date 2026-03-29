import { User, Briefcase, TrendingUp, ShieldCheck, PanelLeftClose } from 'lucide-react';

const Sidebar = ({ userProfile, isOpen, toggleSidebar }) => {
  return (
    <div className="flex flex-col h-full p-6 bg-et-dark">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-serif font-bold text-white">
            <span className="text-et-brand">ET</span> Concierge
          </h1>
        </div>
        
        <button 
          onClick={toggleSidebar}
          className="text-gray-400 hover:text-white transition-colors"
          title="Close Sidebar"
        >
          <PanelLeftClose size={24} />
        </button>
      </div>
      
      <div className="bg-gray-900/50 rounded-xl p-5 border border-gray-700 backdrop-blur-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-et-brand p-3 rounded-full shadow-lg shadow-red-900/50">
            <User className="text-white" size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-white font-sans">
              {userProfile?.personal?.name || "Guest User"}
            </h3>
            <p className="text-xs text-gray-400 flex items-center gap-1 font-sans">
              <span className={`w-2 h-2 rounded-full ${userProfile ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
              {userProfile?.status || "Analyzing Profile..."}
            </p>
          </div>
        </div>

        {userProfile ? (
          <div className="space-y-4 mt-4 animate-fade-in">
             <div className="flex items-center gap-3 text-gray-300 bg-gray-800 p-3 rounded-lg">
                <TrendingUp size={18} className="text-green-400" />
                <div>
                    <p className="text-xs text-gray-500 uppercase font-sans">Risk Appetite</p>
                    <p className="font-medium text-sm font-sans">{userProfile.riskAppetite}</p>
                </div>
             </div>
             <div className="flex items-center gap-3 text-gray-300 bg-gray-800 p-3 rounded-lg">
                <Briefcase size={18} className="text-blue-400" />
                 <div>
                    <p className="text-xs text-gray-500 uppercase font-sans">Interests</p>
                    <p className="font-medium text-sm font-sans">{userProfile.interests}</p>
                </div>
             </div>
          </div>
        ) : (
          <div className="mt-4 text-center text-gray-500 text-sm py-4 border border-dashed border-gray-700 rounded-lg">
            <ShieldCheck size={20} className="mx-auto mb-2 text-gray-600"/>
            <p className="font-sans">Chat with the AI to build your <br/> Financial Passport</p>
          </div>
        )}
      </div>

      <div className="mt-auto text-center pt-4">
        <p className="text-xs text-gray-600 font-sans">Powered by ET AI Hackathon</p>
      </div>
    </div>
  );
};

export default Sidebar;