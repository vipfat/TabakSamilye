import React from 'react';
import { MixIngredient, AiAnalysisResult, TelegramUser } from '../types';
import { X, Share2 } from 'lucide-react';
import BowlChart from './BowlChart';

interface MasterModeProps {
  isOpen: boolean;
  onClose: () => void;
  mix: MixIngredient[];
  totalWeight: number;
  user: TelegramUser;
  aiAnalysis: AiAnalysisResult | null;
}

const MasterMode: React.FC<MasterModeProps> = ({ isOpen, onClose, mix, totalWeight, user, aiAnalysis }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] bg-black flex flex-col animate-in fade-in slide-in-from-bottom-10 duration-300">
      {/* Header */}
      <div className="p-6 flex justify-between items-start">
        <div>
          <p className="text-slate-400 text-sm font-mono">ЗАКАЗ ОТ</p>
          <h1 className="text-3xl font-bold text-white">{user.first_name} {user.last_name}</h1>
          {user.username && <p className="text-emerald-500">@{user.username}</p>}
        </div>
        <button onClick={onClose} className="bg-slate-800 p-3 rounded-full text-white hover:bg-slate-700">
          <X size={24} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center p-4 overflow-y-auto">
        
        <div className="w-full max-w-xs mb-8">
           <BowlChart mix={mix} totalWeight={totalWeight} />
        </div>

        <div className="w-full max-w-md space-y-4">
            {mix.map(item => (
                <div key={item.id} className="flex justify-between items-center bg-slate-900 p-4 rounded-2xl border border-slate-800">
                    <div className="flex items-center gap-4">
                        <div className="w-6 h-6 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-xl font-bold text-white">{item.name}</span>
                    </div>
                    <div className="text-2xl font-mono text-emerald-400 font-bold">
                        {item.grams}г
                    </div>
                </div>
            ))}
        </div>

        {aiAnalysis && (
            <div className="mt-8 p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-xl text-center w-full max-w-md">
                <p className="text-emerald-200 text-lg font-serif italic">"{aiAnalysis.title}"</p>
            </div>
        )}

        <div className="mt-auto pt-8 pb-4 text-slate-500 text-xs text-center">
           Покажите этот экран кальянному мастеру
        </div>
      </div>
    </div>
  );
};

export default MasterMode;