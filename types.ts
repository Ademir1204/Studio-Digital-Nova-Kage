export interface MetricData {
  name: string;
  value: number;
  change: number; // Percentage change
  isPositive: boolean;
  prefix?: string;
  suffix?: string;
  subtext?: string;
}

export interface RevenueData {
  month: string;
  revenue: number;
  expenses: number;
}

export interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  assignee: string;
  priority: 'low' | 'medium' | 'high';
  type: 'design' | 'dev' | 'ai' | 'mobile';
}

export type ViewState = 'dashboard' | 'projects' | 'advisor' | 'services' | 'management';

export interface AIResponse {
  insight: string;
  actionItems: string[];
}

export interface ServicePillar {
  id: string;
  title: string;
  description: string;
  items: string[];
  iconName: 'design' | 'web' | 'mobile' | 'ai';
}

export interface ServicePackage {
  id: string;
  title: string;
  description: string;
  features: string[];
  target: string;
}

// Novos tipos para a Mega Dashboard

export interface StrategyGoal {
  id: string;
  title: string;
  progress: number; // 0 to 100
  deadline: string;
  type: 'trimestral' | 'anual';
}

export interface MarketingMetric {
  channel: string;
  leads: number;
  conversion: string;
  trend: 'up' | 'down' | 'neutral';
}

export interface OperationChecklist {
  id: string;
  category: 'Quality' | 'Docs';
  title: string;
  items: { label: string; checked: boolean }[];
}

export interface AutomationStat {
  name: string;
  status: 'active' | 'idle' | 'error';
  savedTime: string; // ex: "2h/sem"
  executions: number;
}

// Tipos para Integrações e QA Final
export interface ConnectedTool {
  id: string;
  name: string;
  status: 'connected' | 'syncing' | 'error';
  icon: 'canva' | 'google-ai' | 'github' | 'vercel' | 'figma';
  lastSync: string;
  actionLabel: string;
  url: string; // Adicionado para funcionalidade de link
}

export interface FinalTestItem {
  id: string;
  category: 'Visual' | 'Performance' | 'Segurança';
  testName: string;
  status: 'passed' | 'warning' | 'pending';
  score?: number; // 0-100
}