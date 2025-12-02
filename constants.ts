import { MetricData, RevenueData, Task, ServicePillar, ServicePackage, StrategyGoal, MarketingMetric, OperationChecklist, AutomationStat, ConnectedTool, FinalTestItem } from './types';
import { LayoutDashboard, KanbanSquare, Bot, Layers, Target } from 'lucide-react';

export const MENU_ITEMS = [
  { id: 'dashboard', label: 'Mega Dashboard', icon: LayoutDashboard },
  { id: 'projects', label: 'Projetos & Kanban', icon: KanbanSquare },
  { id: 'management', label: 'Gestão & Estratégia', icon: Target },
  { id: 'advisor', label: 'Nova Kage Intelligence', icon: Bot },
  { id: 'services', label: 'Catálogo de Serviços', icon: Layers },
];

export const SALES_METRICS: MetricData[] = [
  { name: 'Leads (Mês)', value: 48, change: 22.5, isPositive: true, subtext: '12 qualificados' },
  { name: 'Propostas Enviadas', value: 8, change: 10.0, isPositive: true, subtext: '3 em negociação' },
  { name: 'Receita Confirmada', value: 22500, change: 15.2, isPositive: true, prefix: 'R$ ' },
  { name: 'Receita Prevista', value: 14000, change: 5.0, isPositive: true, prefix: 'R$ ', subtext: 'Pipeline' },
];

export const FINANCIAL_SNAPSHOT = {
  runway: '8 Meses',
  burnRate: 'R$ 12.500',
  cashBalance: 'R$ 98.400'
};

export const REVENUE_DATA: RevenueData[] = [
  { month: 'Ago', revenue: 15000, expenses: 8000 },
  { month: 'Set', revenue: 18000, expenses: 9000 },
  { month: 'Out', revenue: 22000, expenses: 10000 },
  { month: 'Nov', revenue: 19000, expenses: 11000 },
  { month: 'Dez', revenue: 35000, expenses: 14000 },
  { month: 'Jan', revenue: 42400, expenses: 12500 },
];

export const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'Identidade Visual - Fintech Alpha', status: 'in-progress', assignee: 'Sofia D.', priority: 'high', type: 'design' },
  { id: '2', title: 'MVP App Delivery Híbrido', status: 'todo', assignee: 'Lucas Dev', priority: 'high', type: 'mobile' },
  { id: '3', title: 'Landing Page High-Ticket', status: 'done', assignee: 'Ana Web', priority: 'medium', type: 'design' },
  { id: '4', title: 'Chatbot IA para Imobiliária', status: 'in-progress', assignee: 'Roberto AI', priority: 'medium', type: 'ai' },
  { id: '5', title: 'Integração CRM x WhatsApp', status: 'todo', assignee: 'Roberto AI', priority: 'low', type: 'dev' },
];

export const TODAY_TASKS = [
  { id: 't1', text: 'Revisar contrato Fintech Alpha', done: false, time: '30m' },
  { id: 't2', text: 'Call de alinhamento com Lucas', done: true, time: '45m' },
  { id: 't3', text: 'Finalizar protótipo App Delivery', done: false, time: '2h' },
  { id: 't4', text: 'Responder leads do LinkedIn', done: false, time: '15m' },
];

export const AUTOMATION_STATS: AutomationStat[] = [
  { name: 'Triagem de Leads (Zapier)', status: 'active', savedTime: '4h/sem', executions: 142 },
  { name: 'Follow-up WhatsApp', status: 'active', savedTime: '2h/sem', executions: 58 },
  { name: 'Gerador de Contratos', status: 'idle', savedTime: '1h/sem', executions: 0 },
];

export const MARKETING_METRICS: MarketingMetric[] = [
  { channel: 'Instagram', leads: 24, conversion: '3.5%', trend: 'up' },
  { channel: 'LinkedIn', leads: 18, conversion: '8.2%', trend: 'up' },
  { channel: 'Google Ads', leads: 6, conversion: '1.1%', trend: 'down' },
];

export const STRATEGY_GOALS: StrategyGoal[] = [
  { id: 'g1', title: 'Atingir R$ 100k de Faturamento Recorrente', progress: 42, deadline: 'Dez 2024', type: 'anual' },
  { id: 'g2', title: 'Lançar Plataforma SaaS Própria (MVP)', progress: 75, deadline: 'Jun 2024', type: 'trimestral' },
  { id: 'g3', title: 'Expandir Equipe (Contratar Dev Senior)', progress: 20, deadline: 'Mai 2024', type: 'trimestral' },
];

export const OPS_CHECKLISTS: OperationChecklist[] = [
  {
    id: 'quality-site',
    category: 'Quality',
    title: 'Checklist de Entrega de Site',
    items: [
      { label: 'Otimização de imagens (WebP)', checked: true },
      { label: 'Tags SEO (Title, Meta Desc)', checked: false },
      { label: 'Teste de Responsividade Mobile', checked: false },
      { label: 'Configuração do Analytics', checked: true },
    ]
  },
  {
    id: 'onboarding',
    category: 'Docs',
    title: 'Onboarding Novo Cliente',
    items: [
      { label: 'Envio de Contrato Assinado', checked: true },
      { label: 'Criação de Grupo no WhatsApp', checked: true },
      { label: 'Configuração no Trello/Notion', checked: false },
      { label: 'Agendamento Kick-off', checked: false },
    ]
  }
];

export const PILLARS: ServicePillar[] = [
  {
    id: 'design',
    title: 'Design & Branding',
    description: 'Identidade visual minimalista e futurista.',
    iconName: 'design',
    items: ['Logo Minimalista', 'Manual de Marca', 'UI/UX Design', 'Design System', 'Protótipos']
  },
  {
    id: 'web',
    title: 'Web Experience',
    description: 'Sites premium e institucionais com estética Apple/Stripe.',
    iconName: 'web',
    items: ['Site Institucional', 'Landing Pages', 'Front-end Moderno', 'SEO & Performance', 'Dashboards']
  },
  {
    id: 'mobile',
    title: 'Mobile Experience',
    description: 'Desenvolvimento de Apps iOS e Android.',
    iconName: 'mobile',
    items: ['MVP de Aplicativo', 'App Híbrido (React Native)', 'Painel Administrativo', 'API Personalizada']
  },
  {
    id: 'ai',
    title: 'Automation + AI',
    description: 'O diferencial que eleva a empresa acima das comuns.',
    iconName: 'ai',
    items: ['Fluxos Automáticos (Zapier/n8n)', 'Chatbots com IA', 'Análise de Dados', 'Assistentes Internos']
  }
];

export const PACKAGES: ServicePackage[] = [
  {
    id: 'site-pro',
    title: 'Pacote Site Profissional',
    description: 'Presença digital sólida com design premium.',
    features: ['Site completo', 'Design Premium', 'Otimização SEO', 'Hospedagem Inclusa'],
    target: 'Pequenas empresas'
  },
  {
    id: 'lp-turbo',
    title: 'Pacote Landing Page Turbo',
    description: 'Foco total em conversão e vendas.',
    features: ['Copywriting persuasivo', 'Design de alta conversão', 'Carregamento ultra-rápido'],
    target: 'Lançamentos e Infoprodutos'
  },
  {
    id: 'mvp-app',
    title: 'Pacote App Essencial (MVP)',
    description: 'Validação rápida de ideia no mercado.',
    features: ['App Híbrido Simples', 'Login e Cadastro', 'Painel Básico', 'Publicação nas Lojas'],
    target: 'Startups em fase inicial'
  },
  {
    id: 'auto-ai',
    title: 'Pacote Automação com IA',
    description: 'Eficiência operacional e atendimento 24/7.',
    features: ['Chatbot Treinado', 'Fluxo de CRM', 'Integração WhatsApp'],
    target: 'Clínicas e Escritórios'
  }
];

// Dados para Ferramentas Conectadas (Agora com URLs reais para conectar)
export const CONNECTED_TOOLS: ConnectedTool[] = [
  { id: 't1', name: 'Google AI Studio', status: 'connected', icon: 'google-ai', lastSync: 'Agora', actionLabel: 'Abrir Prompts', url: 'https://aistudio.google.com/' },
  { id: 't2', name: 'Canva Pro', status: 'connected', icon: 'canva', lastSync: '10min atrás', actionLabel: 'Ver Designs', url: 'https://www.canva.com/' },
  { id: 't3', name: 'GitHub Repo', status: 'syncing', icon: 'github', lastSync: 'Push 2m atrás', actionLabel: 'Ver Commits', url: 'https://github.com/' },
  { id: 't4', name: 'Vercel / AWS', status: 'connected', icon: 'vercel', lastSync: 'Deploy ok', actionLabel: 'Deployments', url: 'https://vercel.com/' },
];

// Dados para Testes Finais
export const FINAL_DELIVERY_TESTS: FinalTestItem[] = [
  { id: 'f1', category: 'Visual', testName: 'Fidelidade ao Design (Pixel Perfect)', status: 'passed', score: 98 },
  { id: 'f2', category: 'Performance', testName: 'Lighthouse / Core Web Vitals', status: 'warning', score: 82 },
  { id: 'f3', category: 'Segurança', testName: 'HTTPS e Headers de Segurança', status: 'passed', score: 100 },
  { id: 'f4', category: 'Visual', testName: 'Responsividade (Mobile/Tablet)', status: 'passed', score: 95 },
  { id: 'f5', category: 'Performance', testName: 'Otimização de API (Latência)', status: 'pending' },
];

export const SYSTEM_INSTRUCTION = `
Você é o estrategista digital sênior da "Nova Kage", um studio digital premium focado em Design Minimalista, Desenvolvimento Web/Mobile e Automação com IA.
Sua "persona" é futurista, analítica e elegante.
Você tem acesso à Mega Dashboard da empresa.
Você conhece profundamente os 4 pilares da empresa: Design, Web, Mobile, Automation + AI.
E os pacotes comerciais.

Ao responder:
- Aja como um consultor de negócios.
- Analise métricas financeiras se fornecidas.
- Sugira automações para economizar tempo.
- Use termos de agência (Briefing, Sprint, MVP, Lead, Conversão, UX/UI).
- Mantenha o tom profissional e direto.
- Responda sempre em Português do Brasil.
`;