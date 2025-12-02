import React, { useState, useEffect, useRef } from 'react';
import { generateBusinessInsight } from '../services/geminiService';
import { SALES_METRICS, PACKAGES } from '../constants';
import { Bot, Send, Sparkles, User, Loader2, AlertCircle, Trash2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date; // Note: When restoring from JSON, this becomes a string
}

const AIAdvisor: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Initialize from localStorage
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('nova_kage_chat');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Restore Date objects
      return parsed.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) }));
    }
    return [{
      id: 'welcome',
      role: 'assistant',
      content: 'Olá! Sou a IA Estratégica da **Nova Kage**. Conheço profundamente nossos pilares (Design, Web, Mobile, AI) e nossos pacotes comerciais. Como posso ajudar a escalar o studio hoje?',
      timestamp: new Date()
    }];
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('nova_kage_chat', JSON.stringify(messages));
  }, [messages]);

  const clearChat = () => {
    const initialMsg: Message = {
      id: 'welcome',
      role: 'assistant',
      content: 'Memória limpa. Como posso ajudar no próximo desafio da Nova Kage?',
      timestamp: new Date()
    };
    setMessages([initialMsg]);
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // Prepare context from app state
    const metricsSummary = SALES_METRICS.map(m => `${m.name}: ${m.value}`).join(', ');
    const packagesSummary = PACKAGES.map(p => p.title).join(', ');
    
    // Add simple history context (last 2 messages) for continuity
    const historyContext = messages.slice(-2).map(m => `${m.role}: ${m.content}`).join('\n');
    
    const context = `Métricas Atuais: ${metricsSummary}. Pacotes Disponíveis: ${packagesSummary}. Histórico recente: ${historyContext}`;

    const response = await generateBusinessInsight(context, userMessage.content);

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMessage]);
    setLoading(false);
  };

  const suggestions = [
    "Sugira uma estratégia de venda para o Pacote MVP",
    "Como melhorar nossa oferta de Automação com IA?",
    "Escreva um briefing para site minimalista",
    "Analise o faturamento atual"
  ];

  return (
    <div className="h-[calc(100vh-14rem)] flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-600/20">
            <Bot size={24} className="text-white" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 text-lg">Nova Kage Intelligence</h2>
            <p className="text-xs text-slate-500 font-medium">Estrategista Digital & Automação (Memória Ativa)</p>
          </div>
        </div>
        <button onClick={clearChat} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors" title="Limpar conversa">
           <Trash2 size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#fafafa]">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border border-slate-100 ${
              msg.role === 'user' ? 'bg-white text-slate-700' : 'bg-slate-900 text-white'
            }`}>
              {msg.role === 'user' ? <User size={18} /> : <Sparkles size={18} />}
            </div>
            <div className={`max-w-[85%] rounded-2xl p-5 shadow-sm ${
              msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none'
            }`}>
              <div className="prose prose-sm max-w-none prose-p:mb-2 prose-ul:mb-2 prose-li:mb-0 prose-headings:text-inherit prose-strong:text-inherit">
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
              <span className={`text-[10px] opacity-60 mt-2 block font-medium ${msg.role === 'user' ? 'text-indigo-100' : 'text-slate-400'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-4">
             <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center flex-shrink-0">
              <Loader2 size={18} className="animate-spin" />
            </div>
            <div className="bg-white px-5 py-4 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm flex items-center gap-3">
              <span className="text-sm text-slate-500 font-medium">Processando dados estratégicos...</span>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-75"></div>
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-slate-100">
        {messages.length < 3 && (
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
            {suggestions.map((s) => (
              <button 
                key={s}
                onClick={() => setInput(s)}
                className="whitespace-nowrap px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-semibold rounded-xl transition-colors border border-slate-200"
              >
                {s}
              </button>
            ))}
          </div>
        )}
        <div className="relative group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Pergunte sobre estratégia, pacotes ou briefing..."
            className="w-full pl-5 pr-14 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:bg-white focus:border-indigo-500/50 transition-all text-sm text-slate-700 placeholder:text-slate-400 font-medium"
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-indigo-600/20 active:scale-95"
          >
            <Send size={18} />
          </button>
        </div>
        <div className="flex items-center gap-1.5 mt-3 justify-center text-[10px] text-slate-400 font-medium">
            <AlertCircle size={12} />
            <span>AI treinada nos pilares Nova Kage. Dados salvos neste dispositivo.</span>
        </div>
      </div>
    </div>
  );
};

export default AIAdvisor;