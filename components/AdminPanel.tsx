import React, { useState } from 'react';
import { Flavor, FlavorCategory } from '../types';
import { X, Save, Plus, Power, Eye, EyeOff } from 'lucide-react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  allFlavors: Flavor[];
  onUpdateFlavor: (flavor: Flavor) => void;
  onAddFlavor: (flavor: Flavor) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose, allFlavors, onUpdateFlavor, onAddFlavor }) => {
  const [activeTab, setActiveTab] = useState<'stock' | 'add'>('stock');
  
  // Add Flavor State
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<FlavorCategory>(FlavorCategory.FRUIT);
  const [newColor, setNewColor] = useState('#10b981');

  if (!isOpen) return null;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;

    const newFlavor: Flavor = {
      id: `custom_${Date.now()}`,
      name: newName,
      category: newCategory,
      color: newColor,
      isAvailable: true
    };

    onAddFlavor(newFlavor);
    setNewName('');
    alert('Вкус добавлен!');
  };

  return (
    <div className="fixed inset-0 z-[60] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-slate-900 border border-emerald-500/30 w-full max-w-2xl h-[85vh] rounded-2xl shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-900 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="bg-red-900/30 p-2 rounded-lg border border-red-500/20">
              <Power size={20} className="text-red-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Админ-Панель</h2>
              <p className="text-xs text-slate-400">Управление базой вкусов</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex p-2 gap-2 bg-slate-800/50">
          <button 
            onClick={() => setActiveTab('stock')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'stock' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-700'}`}
          >
            Стоп-лист / Наличие
          </button>
          <button 
            onClick={() => setActiveTab('add')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'add' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-700'}`}
          >
            Добавить новый вкус
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          
          {activeTab === 'stock' && (
            <div className="space-y-2">
              <div className="flex justify-between items-center mb-4 px-2">
                <span className="text-xs text-slate-500 uppercase font-bold">Всего: {allFlavors.length}</span>
                <span className="text-xs text-slate-500 uppercase font-bold">Активно: {allFlavors.filter(f => f.isAvailable).length}</span>
              </div>
              
              {allFlavors.map(flavor => (
                <div key={flavor.id} className="flex items-center justify-between p-3 bg-slate-800/40 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full border border-slate-600" style={{ backgroundColor: flavor.color }}></div>
                    <div>
                      <div className="font-medium text-white">{flavor.name}</div>
                      <div className="text-xs text-slate-500">{flavor.category}</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => onUpdateFlavor({ ...flavor, isAvailable: !flavor.isAvailable })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${flavor.isAvailable ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}
                  >
                    {flavor.isAvailable ? (
                        <>
                            <Eye size={14} /> В меню
                        </>
                    ) : (
                        <>
                            <EyeOff size={14} /> Скрыт
                        </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'add' && (
            <form onSubmit={handleAdd} className="space-y-6 max-w-md mx-auto py-4">
               <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Название вкуса</label>
                  <input 
                    type="text" 
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:border-emerald-500 focus:outline-none"
                    placeholder="Например: Ледяной Кактус"
                  />
               </div>

               <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Категория</label>
                  <select 
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as FlavorCategory)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:border-emerald-500 focus:outline-none appearance-none"
                  >
                     {Object.values(FlavorCategory).map(c => (
                        <option key={c} value={c}>{c}</option>
                     ))}
                  </select>
               </div>

               <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Цвет (для диаграммы)</label>
                  <div className="flex items-center gap-4">
                      <input 
                        type="color" 
                        value={newColor}
                        onChange={(e) => setNewColor(e.target.value)}
                        className="w-12 h-12 rounded-lg cursor-pointer bg-transparent border-0 p-0"
                      />
                      <span className="text-slate-400 font-mono">{newColor}</span>
                  </div>
               </div>

               <button 
                 type="submit"
                 className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-900/20"
               >
                 <Save size={20} />
                 Сохранить в базу
               </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;