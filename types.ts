export enum FlavorCategory {
  FRUIT = 'Фрукты',
  BERRY = 'Ягоды',
  DESSERT = 'Десерты',
  MINT = 'Мята/Холод',
  SPICE = 'Специи/Чай',
  TOBACCO = 'Табачные/Орехи',
  FLORAL = 'Цветочные'
}

export interface Flavor {
  id: string;
  name: string;
  category: FlavorCategory;
  color: string; // Hex code for UI
  isAvailable: boolean; // If false, hidden from user selector (stop-list)
}

export interface MixIngredient extends Flavor {
  grams: number;
}

export interface AiAnalysisResult {
  title: string;
  description: string;
  strengthEstimate: string; // e.g. "Light", "Medium", "Strong"
  pairingSuggestion: string;
}

// --- Telegram & History Types ---

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

export interface SavedMix {
  id: string;
  userId: number;
  timestamp: number;
  ingredients: MixIngredient[];
  aiAnalysis?: AiAnalysisResult;
  isFavorite: boolean;
}