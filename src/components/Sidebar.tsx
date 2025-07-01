import React from 'react';
import { Menu, X, MapPin } from 'lucide-react';
import { scenarios } from '../data/scenarios';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onScenarioSelect: (scenario: typeof scenarios[0]) => void;
  scenarios: typeof scenarios;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle, onScenarioSelect, scenarios }) => {
  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="fixed top-20 left-4 z-50 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 border border-white/20"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-black/90 backdrop-blur-md border-r border-white/10 transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } w-80`}
      >
        <div className="p-6 pt-24">
          <h2 className="text-xl font-bold text-white mb-6 font-japanese">
            旅行シナリオ
            <span className="block text-sm font-normal text-gray-300 mt-1">Travel Scenarios</span>
          </h2>
          
          <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
            {scenarios.map((scenario, index) => (
              <button
                key={index}
                onClick={() => onScenarioSelect(scenario)}
                className="w-full text-left bg-white/5 hover:bg-white/10 rounded-lg p-4 transition-all duration-200 border border-white/10 hover:border-white/20 group"
              >
                <div className="flex items-start space-x-3">
                  <MapPin className="text-gray-400 mt-1 flex-shrink-0" size={16} />
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-medium text-sm mb-1">
                      {scenario.city} - {scenario.place}
                    </div>
                    <div className="text-gray-300 text-xs mb-2">
                      {scenario.situation}
                    </div>
                    <div className="text-gray-400 text-xs font-japanese leading-relaxed">
                      {scenario.japanese}
                    </div>
                    <div className="text-gray-500 text-xs mt-1">
                      {scenario.english}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={onToggle}
        />
      )}
    </>
  );
};

export default Sidebar;