import React from 'react';
import { MixIngredient } from '../types';
import { X } from 'lucide-react';
import { MAX_BOWL_SIZE } from '../constants';

interface MixControlsProps {
  mix: MixIngredient[];
  onUpdateGrams: (id: string, grams: number) => void;
  onRemove: (id: string) => void;
  totalWeight: number;
}

const MixControls: React.FC<MixControlsProps> = ({ mix, onUpdateGrams, onRemove, totalWeight }) => {
  
  if (mix.length === 0) {
    return (
      <div className="text-center py-8 border-2 border-dashed border-slate-800 rounded-2xl bg-slate-900/30">
        <p className="text-slate-500 text-sm">Чаша пуста. Добавьте табак, чтобы начать миксовать.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {mix.map((ingredient) => {
        // The scale of the slider is always 0 to MAX_BOWL_SIZE (18).
        // However, the user can only drag up to (Current + Remaining).
        const remainingGlobal = MAX_BOWL_SIZE - totalWeight;
        const maxAllowed = ingredient.grams + remainingGlobal;

        return (
          <div key={ingredient.id} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 shadow-sm relative overflow-hidden">
            {/* Background fill for the card to visualize proportion roughly */}
            <div 
                className="absolute bottom-0 left-0 top-0 bg-slate-700/20 -z-10 transition-all duration-300"
                style={{ width: `${(ingredient.grams / MAX_BOWL_SIZE) * 100}%` }}
            />

            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full shadow-sm border border-slate-600" 
                  style={{ backgroundColor: ingredient.color }} 
                />
                <span className="font-medium text-slate-100">{ingredient.name}</span>
              </div>
              <button 
                onClick={() => onRemove(ingredient.id)}
                className="text-slate-500 hover:text-red-400 transition-colors p-1 hover:bg-slate-700 rounded-md"
                aria-label="Удалить вкус"
              >
                <X size={14} />
              </button>
            </div>
            
            <div className="flex items-center gap-4">
                <div className="flex-1 relative h-6 flex items-center">
                    {/* Track Background: Represents fixed 0-18g scale */}
                    <div className="absolute w-full h-2 bg-slate-900 rounded-lg overflow-hidden flex">
                         {/* Allowed Region: Visualizes how far this slider can theoretically go given the other ingredients */}
                         <div 
                            className="h-full bg-slate-700/50 transition-all duration-200"
                            style={{ width: `${(maxAllowed / MAX_BOWL_SIZE) * 100}%` }}
                         />
                    </div>

                    {/* Range Input */}
                    <input
                        type="range"
                        min="1"
                        max={MAX_BOWL_SIZE} // Scale is fixed to 18
                        step="1"
                        value={ingredient.grams}
                        onChange={(e) => {
                            const val = parseInt(e.target.value);
                            if (!isNaN(val)) {
                                // Clamp value to what is allowed
                                const clamped = Math.min(val, maxAllowed);
                                onUpdateGrams(ingredient.id, clamped);
                            }
                        }}
                        className="relative w-full h-2 bg-transparent appearance-none cursor-pointer focus:outline-none accent-emerald-500 hover:accent-emerald-400"
                        style={{ zIndex: 10 }}
                    />
                </div>
                <div className="w-12 text-right">
                    <span className="text-lg font-mono font-bold text-white">
                        {ingredient.grams}
                    </span>
                    <span className="text-xs text-slate-500 ml-0.5">г</span>
                </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MixControls;