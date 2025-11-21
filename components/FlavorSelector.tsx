import React, { useState } from 'react';
import { Flavor, FlavorCategory } from '../types';
import { Search, Check, X, Filter } from 'lucide-react';

interface FlavorSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: (flavor: Flavor) => void;
  currentFlavorIds: string[];
  availableFlavors: Flavor[]; // New prop to receive dynamic list
}

const FlavorSelector: React.FC<FlavorSelectorProps> = ({ isOpen, onClose, onToggle, currentFlavorIds, availableFlavors }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FlavorCategory | 'Все'>('Все');

  if (!isOpen) return null;

  const categories = ['Все', ...Object.values(FlavorCategory)];

  const filteredFlavors = availableFlavors.filter(flavor => {
    const matchesSearch = flavor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Все' || flavor.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-md h-[90vh] rounded-2xl shadow-2xl flex flex-col animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900 rounded-t-2xl">
          <div>
            <h2 className="text-xl font-bold text-white">Выбор табака</h2>
            <p className="text-xs text-slate-400">Выберите несколько для микса</p>
          </div>
          <button onClick={onClose} className="bg-slate-800 hover:bg-slate-700 p-2 rounded-full text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Search & Filter */}
        <div className="p-4 space-y-3 bg-slate-900/50 border-b border-slate-800/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              placeholder="Поиск вкусов..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex overflow-x-auto gap-2 pb-1 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredFlavors.length === 0 ? (
            <div className="text-center py-10 text-slate-500 flex flex-col items-center gap-2">
              <Filter size={24} />
              <p>Вкусы не найдены.</p>
            </div>
          ) : (
            filteredFlavors.map(flavor => {
              const isSelected = currentFlavorIds.includes(flavor.id);
              return (
                <button
                  key={flavor.id}
                  onClick={() => onToggle(flavor)}
                  className={`w-full flex items-center p-3 rounded-xl transition-all group text-left border ${
                    isSelected 
                        ? 'bg-emerald-900/20 border-emerald-500/50' 
                        : 'hover:bg-slate-800 border-transparent'
                  }`}
                >
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center mr-4 shadow-sm relative"
                    style={{ backgroundColor: flavor.color }}
                  >
                      {isSelected && (
                        <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center animate-in fade-in duration-200">
                            <Check size={20} className="text-white" />
                        </div>
                      )}
                      {!isSelected && (
                        <span className="text-xs font-bold text-white/80 mix-blend-hard-light">
                            {flavor.name.substring(0,2).toUpperCase()}
                        </span>
                      )}
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-sm font-semibold transition-colors ${isSelected ? 'text-emerald-300' : 'text-white group-hover:text-emerald-200'}`}>
                      {flavor.name}
                    </h3>
                    <span className="text-xs text-slate-500">{flavor.category}</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-emerald-500 border-emerald-500' : 'border-slate-600'
                  }`}>
                      {isSelected && <Check size={12} className="text-white" />}
                  </div>
                </button>
              )
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900 rounded-b-2xl">
            <button 
                onClick={onClose}
                className="w-full bg-white text-slate-900 font-bold py-3 rounded-xl hover:bg-slate-200 transition-colors"
            >
                Готово (выбрано: {currentFlavorIds.length})
            </button>
        </div>

      </div>
    </div>
  );
};

export default FlavorSelector;