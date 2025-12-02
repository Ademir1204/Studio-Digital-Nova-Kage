import React, { useState, useEffect } from 'react';
import { MARKETING_METRICS, STRATEGY_GOALS, OPS_CHECKLISTS, FINAL_DELIVERY_TESTS } from '../constants';
import { Target, TrendingUp, FileCheck, ExternalLink, Download, CheckSquare, Beaker, ShieldCheck, Gauge, AlertTriangle, MonitorPlay, Loader2 } from 'lucide-react';

const ManagementCenter: React.FC = () => {
  // Initialize and persist Checklists
  const [checklists, setChecklists] = useState(() => {
    const saved = localStorage.getItem('nova_kage_checklists');
    return saved ? JSON.parse(saved) : OPS_CHECKLISTS;
  });

  // Initialize and persist Tests
  const [testItems, setTestItems] = useState(() => {
    const saved = localStorage.getItem('nova_kage_tests');
    return saved ? JSON.parse(saved) : FINAL_DELIVERY_TESTS;
  });

  const [runningTestId, setRunningTestId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('nova_kage_checklists', JSON.stringify(checklists));
  }, [checklists]);

  useEffect(() => {
    localStorage.setItem('nova_kage_tests', JSON.stringify(testItems));
  }, [testItems]);

  const getScoreColor = (score?: number) => {
    if (!score) return 'text-slate-400';
    if (score >= 90) return 'text-emerald-500';
    if (score >= 70) return 'text-amber-500';
    return 'text-rose-500';
  };

  const handleRunTest = (id: string) => {
    setRunningTestId(id);
    // Simula a execução do teste
    setTimeout(() => {
        setTestItems((prev: any[]) => prev.map((item: any) => {
            if (item.id === id) {
                return { ...item, status: 'passed', score: Math.floor(Math.random() * (100 - 85) + 85) };
            }
            return item;
        }));
        setRunningTestId(null);
    }, 1500);
  };

  const toggleChecklistItem = (listId: string, itemIdx: number) => {
      setChecklists((prev: any[]) => prev.map((list: any) => {
          if (list.id === listId) {
              const newItems = [...list.items];
              newItems[itemIdx] = { ...newItems[itemIdx], checked: !newItems[itemIdx].checked };
              return { ...list, items: newItems };
          }
          return list;
      }));
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Bloco Bônus: Visão e Estratégia */}
      <section className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-start justify-between mb-8">
            <div>
                <h2 className="text-2xl font-bold flex items-center gap-3">
                    <Target className="text-indigo-400" /> 
                    Visão & Estratégia
                </h2>
                <p className="text-indigo-200 mt-2 text-sm max-w-2xl">
                    "Para onde estamos indo?" - Monitoramento de metas de longo prazo e roadmap da Nova Kage.
                </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 text-center">
                <span className="block text-xs text-indigo-200 uppercase tracking-widest">Foco Trimestral</span>
                <span className="font-bold text-lg">Escala & SaaS</span>
            </div>
        </div>

        <div className="space-y-6">
            {STRATEGY_GOALS.map((goal) => (
                <div key={goal.id}>
                    <div className="flex justify-between text-sm mb-2 font-medium">
                        <span>{goal.title}</span>
                        <span className="text-indigo-300">{goal.deadline} • {goal.progress}%</span>
                    </div>
                    <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000"
                            style={{ width: `${goal.progress}%` }}
                        ></div>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* NOVA DIVISÓRIA: Teste Final antes de Entrega (Quality Assurance Lab) */}
      <section className="bg-indigo-50/50 rounded-xl border border-indigo-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-indigo-100 bg-white/50 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Beaker size={20} className="text-indigo-600" />
                Lab de Teste Final (Pre-Delivery)
            </h3>
            <div className="flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
               <span className="text-xs font-bold text-slate-500 uppercase">Ambiente de Staging</span>
            </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
             {/* Cards de Métricas de Qualidade */}
             <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col items-center text-center shadow-sm">
                 <div className="mb-2 p-2 bg-emerald-50 rounded-full text-emerald-600"><ShieldCheck size={20}/></div>
                 <span className="text-xs text-slate-500 uppercase font-bold">Segurança</span>
                 <strong className="text-2xl font-bold text-slate-800">100%</strong>
                 <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mt-1">Aprovado</span>
             </div>
             <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col items-center text-center shadow-sm">
                 <div className="mb-2 p-2 bg-indigo-50 rounded-full text-indigo-600"><Gauge size={20}/></div>
                 <span className="text-xs text-slate-500 uppercase font-bold">Performance (Lighthouse)</span>
                 <strong className="text-2xl font-bold text-slate-800">92/100</strong>
                 <span className="text-[10px] text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full mt-1">Ótimo</span>
             </div>
             <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col items-center text-center shadow-sm">
                 <div className="mb-2 p-2 bg-amber-50 rounded-full text-amber-600"><AlertTriangle size={20}/></div>
                 <span className="text-xs text-slate-500 uppercase font-bold">Issues Abertas</span>
                 <strong className="text-2xl font-bold text-slate-800">3</strong>
                 <span className="text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full mt-1">Requer Atenção</span>
             </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold">
                      <tr>
                          <th className="px-6 py-4">Critério de Teste</th>
                          <th className="px-6 py-4">Categoria</th>
                          <th className="px-6 py-4">Score</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4 text-right">Ação</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                      {testItems.map((test: any) => (
                          <tr key={test.id} className="hover:bg-slate-50/80 transition-colors">
                              <td className="px-6 py-4 font-medium text-slate-800">{test.testName}</td>
                              <td className="px-6 py-4">
                                  <span className="px-2 py-1 rounded border border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                                      {test.category}
                                  </span>
                              </td>
                              <td className={`px-6 py-4 font-bold ${getScoreColor(test.score)}`}>
                                  {test.score ? `${test.score}/100` : '-'}
                              </td>
                              <td className="px-6 py-4">
                                  {test.status === 'passed' && <span className="flex items-center gap-1 text-emerald-600 font-bold text-xs"><CheckSquare size={14} /> Aprovado</span>}
                                  {test.status === 'warning' && <span className="flex items-center gap-1 text-amber-500 font-bold text-xs"><AlertTriangle size={14} /> Atenção</span>}
                                  {test.status === 'pending' && <span className="flex items-center gap-1 text-slate-400 font-bold text-xs"><MonitorPlay size={14} /> Pendente</span>}
                              </td>
                              <td className="px-6 py-4 text-right">
                                  <button 
                                      onClick={() => handleRunTest(test.id)}
                                      disabled={runningTestId === test.id || test.status === 'passed'}
                                      className={`font-medium text-xs border px-3 py-1.5 rounded transition-colors flex items-center gap-2 ml-auto ${
                                          test.status === 'passed' 
                                            ? 'text-emerald-500 border-emerald-200 bg-emerald-50 cursor-default'
                                            : 'text-indigo-600 border-indigo-200 hover:bg-indigo-50 hover:text-indigo-800'
                                      }`}
                                  >
                                      {runningTestId === test.id ? (
                                          <><Loader2 size={12} className="animate-spin" /> Rodando...</>
                                      ) : test.status === 'passed' ? (
                                          'Concluído'
                                      ) : (
                                          'Rodar Teste'
                                      )}
                                  </button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
          
          <div className="mt-6 flex justify-end">
              <button className="bg-slate-900 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 shadow-lg hover:bg-slate-800 transition-all hover:scale-[1.02]">
                  <FileCheck size={18} />
                  Gerar Relatório de Entrega & Aprovar
              </button>
          </div>
        </div>
      </section>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Bloco 6: Painel de Marketing */}
          <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                      <TrendingUp size={20} className="text-rose-500" />
                      6. Marketing & Aquisição
                  </h3>
                  <button className="text-xs text-indigo-600 font-semibold hover:underline">Ver Calendário</button>
              </div>
              <div className="p-6">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                      {MARKETING_METRICS.map((m) => (
                          <div key={m.channel} className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-center">
                              <p className="text-xs font-bold text-slate-500 uppercase mb-1">{m.channel}</p>
                              <p className="text-xl font-bold text-slate-800">{m.leads}</p>
                              <p className={`text-[10px] font-bold ${m.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                  {m.trend === 'up' ? '▲' : '▼'} {m.conversion} conv.
                              </p>
                          </div>
                      ))}
                  </div>
                  
                  <div className="space-y-3">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Acesso Rápido</h4>
                      <button className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors group">
                          <span className="text-sm font-medium text-slate-700">Biblioteca de Criativos</span>
                          <ExternalLink size={14} className="text-slate-400 group-hover:text-indigo-500" />
                      </button>
                      <button className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors group">
                          <span className="text-sm font-medium text-slate-700">Gerador de Copy (IA)</span>
                          <ExternalLink size={14} className="text-slate-400 group-hover:text-indigo-500" />
                      </button>
                  </div>
              </div>
          </section>

          {/* Bloco 5: Operação & Qualidade */}
          <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                      <FileCheck size={20} className="text-emerald-500" />
                      5. Operação & Qualidade
                  </h3>
                  <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded border border-emerald-100 font-bold">Padrão Nova Kage</span>
              </div>
              
              <div className="p-6 space-y-6">
                  {checklists.map((list: any) => (
                      <div key={list.id}>
                          <h4 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                              <CheckSquare size={16} className="text-slate-400" />
                              {list.title}
                          </h4>
                          <div className="space-y-2">
                              {list.items.map((item: any, idx: number) => (
                                  <label key={idx} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors">
                                      <div 
                                          onClick={(e) => {
                                              e.preventDefault();
                                              toggleChecklistItem(list.id, idx);
                                          }}
                                          className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${item.checked ? 'bg-slate-800 border-slate-800' : 'border-slate-300 bg-white'}`}
                                      >
                                          {item.checked && <CheckSquare size={12} className="text-white" />}
                                      </div>
                                      <span className={`text-sm ${item.checked ? 'text-slate-400 line-through' : 'text-slate-600'}`}>
                                          {item.label}
                                      </span>
                                  </label>
                              ))}
                          </div>
                      </div>
                  ))}

                  <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
                      <button className="flex items-center justify-center gap-2 py-2 text-xs font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors">
                          <Download size={14} /> Contrato Padrão
                      </button>
                      <button className="flex items-center justify-center gap-2 py-2 text-xs font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors">
                          <Download size={14} /> Modelo Briefing
                      </button>
                  </div>
              </div>
          </section>

      </div>
    </div>
  );
};

export default ManagementCenter;