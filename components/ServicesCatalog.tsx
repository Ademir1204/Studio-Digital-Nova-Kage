import React from 'react';
import { PILLARS, PACKAGES } from '../constants';
import { Palette, Globe, Smartphone, Cpu, Check, ArrowRight } from 'lucide-react';

const ServicesCatalog: React.FC = () => {
  const getIcon = (name: string) => {
    switch(name) {
      case 'design': return <Palette size={24} />;
      case 'web': return <Globe size={24} />;
      case 'mobile': return <Smartphone size={24} />;
      case 'ai': return <Cpu size={24} />;
      default: return <Globe size={24} />;
    }
  };

  return (
    <div className="space-y-10 pb-10">
      {/* Pillars Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">4 Pilares de Excelência</h2>
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                Core Business
            </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((pillar) => (
            <div key={pillar.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-slate-900/20">
                {getIcon(pillar.iconName)}
              </div>
              <h3 className="font-bold text-lg text-slate-800 mb-2">{pillar.title}</h3>
              <p className="text-sm text-slate-500 mb-4 h-10">{pillar.description}</p>
              <ul className="space-y-2">
                {pillar.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 font-medium">
                    <div className="w-1 h-1 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Packages Section */}
      <section>
        <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-bold text-slate-900">Pacotes Prontos</h2>
            <div className="h-px bg-slate-200 flex-1"></div>
            <span className="text-slate-400 text-sm">Soluções Turn-key</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PACKAGES.map((pkg) => (
            <div key={pkg.id} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative overflow-hidden group hover:bg-white hover:border-indigo-200 transition-colors">
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-100 transition-opacity">
                 <ArrowRight className="text-indigo-600" />
              </div>
              
              <span className="inline-block px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-bold text-slate-500 mb-3 uppercase tracking-wider">
                {pkg.target}
              </span>
              
              <h3 className="font-bold text-slate-900 mb-2">{pkg.title}</h3>
              <p className="text-xs text-slate-500 mb-4">{pkg.description}</p>
              
              <div className="space-y-2 border-t border-slate-200/60 pt-4 mt-2">
                {pkg.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                    <Check size={12} className="text-emerald-500" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                Ver Detalhes
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ServicesCatalog;