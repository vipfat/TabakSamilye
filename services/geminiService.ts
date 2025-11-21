import { GoogleGenAI, Type, Schema } from "@google/genai";
import { MixIngredient, AiAnalysisResult } from '../types';

// Initialize GenAI
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Analyzes the current bowl mix using Gemini.
 */
export const analyzeMix = async (mix: MixIngredient[]): Promise<AiAnalysisResult> => {
  if (mix.length === 0) {
    return {
      title: "Чаша пуста",
      description: "Добавьте вкусы для анализа.",
      strengthEstimate: "Н/Д",
      pairingSuggestion: "Попробуйте добавить базу, например Двойное Яблоко или Чернику."
    };
  }

  const mixDescription = mix
    .map(m => `${m.grams}г ${m.name} (${m.category})`)
    .join(', ');

  const prompt = `
    Ты - кальянный мастер мирового класса (Кальянный Сомелье).
    Проанализируй следующий микс для чаши кальяна:
    ${mixDescription}

    Придумай креативное название на русском языке, дай сенсорное описание профиля вкуса (вкус, запах),
    оцени вероятную крепость/тяжесть основываясь на типичных табаках этих вкусов,
    и предложи напиток (чай, кофе, коктейль), который хорошо сочетается с этим миксом.
    Отвечай на русском языке.
  `;

  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING, description: "Креативное, короткое название для этого микса" },
      description: { type: Type.STRING, description: "Абзац, описывающий сенсорные ощущения" },
      strengthEstimate: { type: Type.STRING, description: "Оценка крепости (например: Легкая, Средняя, Крепкая)" },
      pairingSuggestion: { type: Type.STRING, description: "Напиток, который хорошо сочетается" }
    },
    required: ["title", "description", "strengthEstimate", "pairingSuggestion"]
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        systemInstruction: "Ты эксперт в кальянной миксологии. Будь изысканным, но понятным. Отвечай только JSON."
      }
    });

    const text = response.text;
    if (!text) throw new Error("Нет ответа от ИИ");
    
    return JSON.parse(text) as AiAnalysisResult;

  } catch (error) {
    console.error("Ошибка анализа микса:", error);
    return {
      title: "Ошибка анализа",
      description: "ИИ ушел на перекур. Пожалуйста, попробуйте снова.",
      strengthEstimate: "Неизвестно",
      pairingSuggestion: "Вода"
    };
  }
};

/**
 * Suggests a random mix based on a mood or vibe.
 */
export const suggestMixRecipe = async (vibe: string, availableFlavors: string[]): Promise<any> => {
   const prompt = `
    У меня есть следующие вкусы: ${availableFlavors.join(', ')}.
    Создай рецепт микса для кальяна под настроение "${vibe}".
    Общий вес должен быть ровно 18г.
    Верни список ингредиентов с граммовками.
   `;

   try {
     const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    ingredients: { 
                        type: Type.ARRAY, 
                        items: { 
                            type: Type.OBJECT,
                            properties: {
                                flavorName: { type: Type.STRING },
                                grams: { type: Type.NUMBER }
                            }
                        } 
                    },
                    reasoning: { type: Type.STRING }
                }
            }
        }
     });
     return JSON.parse(response.text || "{}");
   } catch (e) {
       console.error(e);
       return null;
   }
}