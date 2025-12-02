import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ProjectBoard from './components/ProjectBoard';
import AIAdvisor from './components/AIAdvisor';
import ServicesCatalog from './components/ServicesCatalog';
import ManagementCenter from './components/ManagementCenter';
import { ViewState } from './types';
import { Bell, Search, ChevronDown, HelpCircle, User, ShieldCheck, Zap } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'projects':
        return <ProjectBoard />;
      case 'advisor':
        return <AIAdvisor />;
      case 'services':
        return <ServicesCatalog />;
      case 'management':
        return <ManagementCenter />;
      default:
        return <Dashboard />;
    }
  };

  const getPageTitle = () => {
    switch(currentView) {
      case 'dashboard': return 'Mega Dashboard';
      case 'projects': return 'Produção & Projetos';
      case 'advisor': return 'Inteligência Estratégica';
      case 'services': return 'Catálogo de Serviços';
      case 'management': return 'Gestão & Estratégia';
      default: return 'Quartel General';
    }
  };

  const getPageDescription = () => {
    switch(currentView) {
      case 'dashboard': return 'Visão panorâmica 360º de todas as operações do Studio.';
      case 'projects': return 'Controle de sprints de Design, Desenvolvimento Web/Mobile e IA.';
      case 'advisor': return 'Utilize nossa IA treinada para gerar estratégias de crescimento.';
      case 'services': return 'Portfólio ativo de serviços, pilares da marca e pacotes comerciais.';
      case 'management': return 'Marketing, Operações, Qualidade e Visão de Longo Prazo.';
      default: return '';
    }
  };

  return (
    <div className="flex bg-slate-50 h-screen font-sans overflow-hidden">
      <Sidebar currentView={currentView} onChangeView={setCurrentView} />
      
      {/* 
          Correção de Layout:
          h-screen + overflow-y-auto permite que apenas esta área tenha rolagem, 
          mantendo a sidebar fixa e impedindo que o conteúdo seja cortado.
      */}
      <main className="flex-1 ml-64 flex flex-col h-screen overflow-y-auto relative scroll-smooth">
        
        {/* Top Header - Sticky dentro do container de scroll */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-20 shrink-0">
          <div className="flex items-center gap-4 w-96">
            <div className="relative w-full group">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Buscar projetos, leads ou serviços..." 
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100/50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all text-slate-700 placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="text-slate-400 hover:text-slate-600 transition-colors">
              <HelpCircle size={20} />
            </button>
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative text-slate-400 hover:text-slate-600 transition-colors"
              >
                <Bell size={20} />
                <span className="absolute top-0 right-0.5 w-2 h-2 bg-indigo-500 rounded-full border border-white"></span>
              </button>
            </div>
            <div className="h-8 w-[1px] bg-slate-200"></div>
            <button className="flex items-center gap-3 hover:bg-slate-50 py-1.5 px-3 rounded-xl transition-colors border border-transparent hover:border-slate-200">
              <div className="w-9 h-9 bg-slate-900 rounded-full flex items-center justify-center text-white">
                <User size={16} />
              </div>
              <div className="text-left hidden md:block">
                <p className="text-sm font-bold text-slate-800">Diretor CEO</p>
                <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wide">Nova Kage Admin</p>
              </div>
              <ChevronDown size={14} className="text-slate-400" />
            </button>
          </div>
        </header>

        {/* Page Content Wrapper */}
        <div className="p-8 flex-1">
          <div className="max-w-7xl mx-auto min-h-[calc(100vh-12rem)] flex flex-col">
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-slate-900 capitalize tracking-tight">
                {getPageTitle()}
              </h1>
              <p className="text-slate-500 text-sm mt-2 max-w-2xl">
                {getPageDescription()}
              </p>
            </div>
            
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex-1">
                {renderContent()}
            </div>
          </div>
        </div>

        {/* Footer do Sistema - O "Final" da página */}
        <footer className="border-t border-slate-200 bg-white/50 py-6 px-8 mt-auto shrink-0">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-600">NOVA KAGE OS</span>
              <span>© 2024 Studio Digital. Todos os direitos reservados.</span>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-emerald-600 font-medium">Sistemas Operacionais</span>
              </div>
              <div className="flex items-center gap-1.5 hover:text-indigo-500 cursor-pointer transition-colors">
                <ShieldCheck size={14} />
                <span>Segurança Ativa</span>
              </div>
              <div className="flex items-center gap-1.5 hover:text-amber-500 cursor-pointer transition-colors">
                <Zap size={14} />
                <span>v2.5.0 (Release Candidate)</span>
              </div>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
};

export default App;