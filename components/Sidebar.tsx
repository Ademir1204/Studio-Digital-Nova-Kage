import React from 'react';
import { MENU_ITEMS, STRATEGY_GOALS } from '../constants';
import { ViewState } from '../types';
import { Hexagon, Download } from 'lucide-react';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView }) => {
  // Pega a meta principal (a primeira da lista) para exibir na sidebar
  const mainGoal = STRATEGY_GOALS[0];

  return (
    <aside className="w-64 bg-slate-950 text-slate-300 flex flex-col h-screen fixed left-0 top-0 border-r border-slate-900 z-10">
      <div className="h-20 flex items-center px-6 border-b border-slate-900">
        <div className="flex items-center gap-3 text-white">
          <div className="bg-indigo-600 p-2 rounded-lg shadow-[0_0_15px_rgba(79,70,229,0.5)]">
            <Hexagon size={24} className="text-white fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-wider font-sans">NOVA KAGE</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest">Studio Digital</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 py-8 px-3 space-y-1">
        {MENU_ITEMS.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id as ViewState)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 group ${
                isActive 
                  ? 'bg-indigo-600/10 text-white border border-indigo-500/30' 
                  : 'hover:bg-slate-900 hover:text-white border border-transparent'
              }`}
            >
              <item.icon size={20} className={isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-indigo-400 transition-colors'} />
              <span className="font-medium text-sm tracking-wide">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 space-y-4 border-t border-slate-900">
        <button className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white py-2 rounded-lg text-xs font-bold transition-colors border border-slate-800">
           <Download size={14} /> Instalar App
        </button>

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-5 border border-slate-800">
          <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2">Foco Principal</p>
          <div className="w-full bg-slate-700 h-1.5 rounded-full mb-3 overflow-hidden">
            <div 
              className="bg-indigo-500 h-1.5 rounded-full transition-all duration-1000" 
              style={{ width: `${mainGoal.progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {mainGoal.progress}% de: <br/>
            <span className="text-slate-300 font-medium">{mainGoal.title}</span>
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;