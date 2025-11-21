import { SavedMix, MixIngredient, AiAnalysisResult } from '../types';

const STORAGE_KEY = 'hookah_alchemist_history_v1';

/**
 * Saves a new mix to the user's history.
 */
export const saveMixToHistory = (userId: number, ingredients: MixIngredient[], aiAnalysis?: AiAnalysisResult): SavedMix => {
  const history = getHistory(userId);
  
  const newMix: SavedMix = {
    id: crypto.randomUUID(),
    userId,
    timestamp: Date.now(),
    ingredients,
    aiAnalysis,
    isFavorite: false
  };

  const updatedHistory = [newMix, ...history];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  return newMix;
};

/**
 * Retrieves all mixes for a specific user.
 */
export const getHistory = (userId: number): SavedMix[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    
    const allMixes: SavedMix[] = JSON.parse(raw);
    return allMixes.filter(m => m.userId === userId);
  } catch (e) {
    console.error("Failed to load history", e);
    return [];
  }
};

/**
 * Toggles the 'isFavorite' status of a specific mix.
 */
export const toggleFavoriteMix = (mixId: string): SavedMix[] => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        
        let allMixes: SavedMix[] = JSON.parse(raw);
        allMixes = allMixes.map(m => {
            if (m.id === mixId) {
                return { ...m, isFavorite: !m.isFavorite };
            }
            return m;
        });

        localStorage.setItem(STORAGE_KEY, JSON.stringify(allMixes));
        return allMixes;
    } catch (e) {
        console.error(e);
        return [];
    }
};

/**
 * Deletes a mix from history.
 */
export const deleteMix = (mixId: string): SavedMix[] => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        
        let allMixes: SavedMix[] = JSON.parse(raw);
        allMixes = allMixes.filter(m => m.id !== mixId);

        localStorage.setItem(STORAGE_KEY, JSON.stringify(allMixes));
        return allMixes;
    } catch (e) {
        return [];
    }
};