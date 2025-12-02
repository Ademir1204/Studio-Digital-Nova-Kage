import React, { useState, useEffect } from 'react';
import { Task } from '../types';
import { INITIAL_TASKS } from '../constants';
import { Plus, GripVertical, CheckCircle2, Circle, Clock, Palette, Smartphone, Cpu, X } from 'lucide-react';

const ProjectBoard: React.FC = () => {
  // Initialize from localStorage or use INITIAL_TASKS
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('nova_kage_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskType, setNewTaskType] = useState<Task['type']>('design');
  const [newTaskPriority, setNewTaskPriority] = useState<Task['priority']>('medium');

  // Persist to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('nova_kage_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTaskTitle.trim()) return;
    
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      status: 'todo',
      assignee: 'Eu (Admin)',
      priority: newTaskPriority,
      type: newTaskType
    };

    setTasks([...tasks, newTask]);
    setIsModalOpen(false);
    setNewTaskTitle('');
  };

  const moveTask = (taskId: string, newStatus: Task['status']) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  const getStatusIcon = (status: Task['status']) => {
    switch(status) {
      case 'todo': return <Circle size={16} className="text-slate-400" />;
      case 'in-progress': return <Clock size={16} className="text-indigo-500" />;
      case 'done': return <CheckCircle2 size={16} className="text-emerald-500" />;
    }
  };

  const getTypeIcon = (type: Task['type']) => {
    switch(type) {
        case 'design': return <Palette size={14} className="mr-1" />;
        case 'mobile': return <Smartphone size={14} className="mr-1" />;
        case 'dev': return <Smartphone size={14} className="mr-1" />;
        case 'ai': return <Cpu size={14} className="mr-1" />;
        default: return null;
    }
  }

  const getPriorityColor = (priority: Task['priority']) => {
    switch(priority) {
      case 'high': return 'bg-rose-50 text-rose-600 border-rose-100';
      case 'medium': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'low': return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const columns = [
    { id: 'todo', label: 'Briefing / A Fazer' },
    { id: 'in-progress', label: 'Em Desenvolvimento' },
    { id: 'done', label: 'Entregue / Publicado' }
  ];

  return (
    <div className="h-full flex flex-col relative">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Sprint Atual</h2>
          <p className="text-slate-500 text-sm">Gerencie o fluxo de trabalho da agência (Salvo localmente).</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors shadow-lg shadow-slate-900/20 text-sm"
        >
          <Plus size={16} />
          Novo Projeto
        </button>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden">
        {columns.map((col) => (
          <div key={col.id} className="bg-slate-100/50 rounded-xl p-4 flex flex-col h-full border border-slate-200">
            <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="font-semibold text-slate-700 text-sm uppercase tracking-wide">{col.label}</h3>
              <span className="bg-white border border-slate-200 text-slate-600 px-2 py-0.5 rounded-full text-xs font-bold shadow-sm">
                {tasks.filter(t => t.status === col.id).length}
              </span>
            </div>
            
            <div className="space-y-3 overflow-y-auto flex-1 pr-1 custom-scrollbar">
              {tasks.filter(t => t.status === col.id).map((task) => (
                <div key={task.id} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-all group cursor-default hover:border-indigo-200">
                  <div className="flex justify-between items-start mb-3">
                    <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded border ${getPriorityColor(task.priority)}`}>
                      {task.priority === 'high' ? 'Urgente' : task.priority === 'medium' ? 'Normal' : 'Baixa'}
                    </span>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {/* Simple move buttons for demo since drag-n-drop is complex */}
                      {col.id !== 'todo' && (
                         <button onClick={() => moveTask(task.id, 'todo')} className="p-1 hover:bg-slate-100 rounded" title="Voltar para ToDo">
                            <Circle size={14} />
                         </button>
                      )}
                      {col.id !== 'in-progress' && (
                         <button onClick={() => moveTask(task.id, 'in-progress')} className="p-1 hover:bg-slate-100 rounded" title="Mover para Progresso">
                            <Clock size={14} />
                         </button>
                      )}
                      {col.id !== 'done' && (
                         <button onClick={() => moveTask(task.id, 'done')} className="p-1 hover:bg-slate-100 rounded" title="Concluir">
                            <CheckCircle2 size={14} />
                         </button>
                      )}
                    </div>
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-1 leading-snug">{task.title}</h4>
                  
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 mb-3 uppercase tracking-wider font-semibold">
                      {getTypeIcon(task.type)}
                      {task.type === 'ai' ? 'Automação' : task.type === 'mobile' ? 'Mobile App' : 'Design'}
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-50 pt-3">
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      {getStatusIcon(task.status)}
                      <span>{task.assignee.split(' ')[0]}</span>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold">
                      {task.assignee.charAt(0)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Simple Modal for New Task */}
      {isModalOpen && (
        <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 rounded-2xl">
          <div className="bg-white p-6 rounded-2xl w-96 shadow-2xl animate-in fade-in zoom-in duration-200">
             <div className="flex justify-between items-center mb-4">
               <h3 className="font-bold text-lg">Novo Projeto</h3>
               <button onClick={() => setIsModalOpen(false)}><X size={20} className="text-slate-400" /></button>
             </div>
             
             <div className="space-y-4">
               <div>
                 <label className="block text-xs font-bold text-slate-500 mb-1">Título</label>
                 <input 
                    type="text" 
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-lg text-sm"
                    placeholder="Ex: Redesign Site Institucional"
                    autoFocus
                 />
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Tipo</label>
                    <select 
                      value={newTaskType} 
                      onChange={(e) => setNewTaskType(e.target.value as any)}
                      className="w-full p-2 border border-slate-200 rounded-lg text-sm"
                    >
                      <option value="design">Design</option>
                      <option value="web">Web Dev</option>
                      <option value="mobile">Mobile</option>
                      <option value="ai">AI / Auto</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Prioridade</label>
                    <select 
                      value={newTaskPriority} 
                      onChange={(e) => setNewTaskPriority(e.target.value as any)}
                      className="w-full p-2 border border-slate-200 rounded-lg text-sm"
                    >
                      <option value="high">Alta</option>
                      <option value="medium">Média</option>
                      <option value="low">Baixa</option>
                    </select>
                 </div>
               </div>

               <button 
                  onClick={addTask}
                  className="w-full bg-slate-900 text-white py-2 rounded-lg font-bold text-sm hover:bg-slate-800 transition-colors"
                >
                  Criar Projeto
               </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectBoard;