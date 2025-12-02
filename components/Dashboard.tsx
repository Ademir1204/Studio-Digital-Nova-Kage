import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { SALES_METRICS, REVENUE_DATA, FINANCIAL_SNAPSHOT, TODAY_TASKS, AUTOMATION_STATS, CONNECTED_TOOLS } from '../constants';
import { ArrowUpRight, ArrowDownRight, MoreHorizontal, CheckCircle2, Clock, Zap, Wallet, Bot, Briefcase, Plus, Link as LinkIcon, ExternalLink, Github, Palette, Cloud } from 'lucide-react';

const Dashboard: React.FC = () => {

  const getToolIcon = (icon: string) => {
    switch(icon) {
      case 'google-ai': return <Bot size={18} />;
      case 'canva': return <Palette size={18} />;
      case 'github': return <Github size={18} />;
      case 'vercel': return <Cloud size={18} />;
      default: return <LinkIcon size={18} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'connected': return 'bg-emerald-400';
      case 'syncing': return 'bg-amber-400 animate-pulse';
      case 'error': return 'bg-rose-500';
      default: return 'bg-slate-400';
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Bloco 0: Hub de Ferramentas Conectadas (Novo) */}
      <section className="bg-slate-900 rounded-xl p-4 text-white shadow-lg shadow-slate-900/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 border-r border-slate-700 pr-6 mr-2">
            <div className="p-2 bg-indigo-600 rounded-lg">
               <LinkIcon size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Workspace Conectado</h3>
              <p className="text-xs text-slate-400">Sincronização em tempo real</p>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
             {CONNECTED_TOOLS.map((tool) => (
               <a 
                 key={tool.id} 
                 href={tool.url}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="bg-slate-800 hover:bg-slate-700 transition-colors p-3 rounded-lg border border-slate-700/50 flex flex-col gap-2 group cursor-pointer"
               >
                  <div className="flex justify-between items-start">
                     <div className="text-indigo-300 group-hover:text-white transition-colors">
                        {getToolIcon(tool.icon)}
                     </div>
                     <div className={`w-2 h-2 rounded-full ${getStatusColor(tool.status)} shadow-[0_0_8px_rgba(255,255,255,0.3)]`}></div>
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-200">{tool.name}</span>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-[10px] text-slate-500">{tool.lastSync}</span>
                      <ExternalLink size={10} className="text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
               </a>
             ))}
          </div>
        </div>
      </section>

      {/* Bloco 1: Painel de Vendas e Prospecção */}
      <section>
        <div className="flex justify-between items-end mb-4">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <Wallet size={16} /> 1. Vendas & Prospecção
            </h2>
            <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-100 hover:bg-emerald-100 transition-colors flex items-center gap-1">
                    <Plus size={14} /> Nova Proposta
                </button>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {SALES_METRICS.map((metric) => (
            <div key={metric.name} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-slate-50 to-slate-100 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              
              <div className="flex justify-between items-start mb-3 relative z-10">
                <h3 className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{metric.name}</h3>
                <button className="text-slate-300 hover:text-slate-600">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <div className="flex items-baseline gap-2 mb-1 relative z-10">
                <span className="text-2xl font-bold text-slate-900">
                  {metric.prefix}{metric.value.toLocaleString('pt-BR')}{metric.suffix}
                </span>
              </div>
              {metric.subtext && (
                  <p className="text-xs text-slate-400 mb-2">{metric.subtext}</p>
              )}
              <div className={`flex items-center text-xs font-medium ${metric.isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                {metric.isPositive ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
                {metric.change}% <span className="text-slate-400 ml-1 font-normal">vs. mês anterior</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bloco 4: Painel Financeiro (CFO Mode) */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
                <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <Briefcase size={16} /> 4. Financeiro & Runway
                </h2>
                <p className="text-2xl font-bold text-slate-900 mt-1">{FINANCIAL_SNAPSHOT.cashBalance} <span className="text-sm font-normal text-slate-400">em caixa</span></p>
            </div>
            <div className="text-right">
                <div className="inline-flex items-center gap-2 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100 mb-1">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                    <span className="text-xs font-bold text-indigo-700">Runway: {FINANCIAL_SNAPSHOT.runway}</span>
                </div>
                <p className="text-xs text-slate-400">Burn Rate: {FINANCIAL_SNAPSHOT.burnRate}/mês</p>
            </div>
          </div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }} 
                  tickFormatter={(value) => `k${value/1000}`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#1e293b', fontWeight: 600 }}
                  formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, '']}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#4f46e5" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                  name="Receita"
                />
                <Area 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="#ef4444" 
                  strokeWidth={2} 
                  strokeDasharray="5 5"
                  fillOpacity={0} 
                  fill="transparent" 
                  name="Despesas"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bloco 3: Produtividade Pessoal */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-4">
             <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <Clock size={16} /> 3. Foco do Dia
            </h2>
            <div className="flex gap-1 text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-600">
                25:00
            </div>
          </div>
          
          <div className="space-y-3 flex-1">
             <p className="text-xs text-slate-400 mb-2">Produtividade 80/20 (O que gera resultado)</p>
             {TODAY_TASKS.map((task) => (
                 <div key={task.id} className="flex items-start gap-3 group">
                     <button className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition-colors ${task.done ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 hover:border-indigo-400'}`}>
                         {task.done && <CheckCircle2 size={12} />}
                     </button>
                     <div className="flex-1">
                         <p className={`text-sm ${task.done ? 'text-slate-400 line-through' : 'text-slate-700 font-medium'}`}>{task.text}</p>
                         <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                             <Clock size={10} /> Estimado: {task.time}
                         </span>
                     </div>
                 </div>
             ))}
          </div>

          <button className="w-full mt-4 py-2 border border-dashed border-slate-300 rounded-lg text-slate-500 text-xs font-bold hover:bg-slate-50 hover:text-indigo-600 transition-colors">
              + Adicionar Tarefa Crítica
          </button>
        </div>
      </section>

      {/* Bloco 7: IA e Automação */}
      <section className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 bg-indigo-600 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
        
        <div className="flex items-center justify-between mb-6 relative z-10">
             <h2 className="text-sm font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                <Bot size={16} /> 7. Automação & IA Ativa
            </h2>
            <span className="text-xs bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full border border-indigo-500/30">
                Economia estimada: 7h/semana
            </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {AUTOMATION_STATS.map((stat, idx) => (
                <div key={idx} className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl flex items-center justify-between group hover:bg-slate-800 transition-colors">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className={`w-2 h-2 rounded-full ${stat.status === 'active' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]' : 'bg-slate-500'}`}></div>
                            <h4 className="font-semibold text-sm">{stat.name}</h4>
                        </div>
                        <p className="text-xs text-slate-400">{stat.executions} execuções • Economizou {stat.savedTime}</p>
                    </div>
                    <Zap size={18} className="text-slate-600 group-hover:text-yellow-400 transition-colors" />
                </div>
            ))}
        </div>
      </section>

    </div>
  );
};

export default Dashboard;