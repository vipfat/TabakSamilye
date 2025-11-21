import React, { useState } from 'react';
import { Sparkles, Loader2, RefreshCcw } from 'lucide-react';
import { AiAnalysisResult, MixIngredient } from '../types';
import { analyzeMix } from '../services/geminiService';

interface AiAssistantProps {
  mix: MixIngredient[];
  onAnalysisComplete?: (result: AiAnalysisResult) => void;
}

const AiAssistant: React.FC<AiAssistantProps> = ({ mix, onAnalysisComplete }) => {
  const [analysis, setAnalysis] = useState<AiAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const result = await analyzeMix(mix);
      setAnalysis(result);
      setHasFetched(true);
      if (onAnalysisComplete) {
        onAnalysisComplete(result);
      }
    } finally {
      setLoading(false);
    }
  };

  // Effect to clear analysis if mix is emptied
  React.useEffect(() => {
    if (mix.length === 0 && analysis) {
        setAnalysis(null);
        setHasFetched(false);
    }
  }, [mix, analysis]);

  if (mix.length === 0) return null;

  return (
    <div className="mt-8 bg-gradient-to-br from-teal-900/30 to-emerald-900/30 border border-teal-500/30 rounded-2xl p-6 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-300 flex items-center gap-2">
            <Sparkles size={18} className="text-emerald-400" />
            ИИ Сомелье
          </h3>
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="text-xs font-semibold bg-teal-600 hover:bg-teal-500 text-white px-3 py-1.5 rounded-lg transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <RefreshCcw size={14} />}
            {hasFetched ? 'Пересобрать' : 'Анализ'}
          </button>
        </div>

        {loading && (
          <div className="py-8 flex flex-col items-center justify-center text-teal-300/70 gap-3">
            <Loader2 size={32} className="animate-spin text-teal-400" />
            <p className="text-sm animate-pulse">Пробую цифровой дым...</p>
          </div>
        )}

        {!loading && analysis && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div>
              <h4 className="text-2xl font-serif italic text-white mb-1">"{analysis.title}"</h4>
              <div className="flex gap-2 text-xs mb-3">
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                   Крепость: {analysis.strengthEstimate}
                </span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                {analysis.description}
              </p>
            </div>
            
            <div className="pt-3 border-t border-teal-500/20">
                <p className="text-xs text-teal-300 uppercase tracking-wider font-bold mb-1">Идеальное сочетание</p>
                <p className="text-sm text-white">{analysis.pairingSuggestion}</p>
            </div>
          </div>
        )}
        
        {!loading && !hasFetched && (
             <p className="text-sm text-slate-400 italic">
                Нажмите анализ, чтобы получить описание профиля вкуса, оценку крепости и рекомендации по напиткам.
             </p>
        )}
      </div>
    </div>
  );
};

export default AiAssistant;