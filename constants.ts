import { Flavor, FlavorCategory } from './types';

export const MAX_BOWL_SIZE = 18; // Grams

export const AVAILABLE_FLAVORS: Flavor[] = [
  // Fruits
  { id: 'f1', name: 'Двойное Яблоко', category: FlavorCategory.FRUIT, color: '#ef4444', isAvailable: true },
  { id: 'f2', name: 'Лимон', category: FlavorCategory.FRUIT, color: '#eab308', isAvailable: true },
  { id: 'f3', name: 'Арбуз', category: FlavorCategory.FRUIT, color: '#f472b6', isAvailable: true },
  { id: 'f4', name: 'Грейпфрут', category: FlavorCategory.FRUIT, color: '#f87171', isAvailable: true },
  { id: 'f5', name: 'Манго', category: FlavorCategory.FRUIT, color: '#f59e0b', isAvailable: true },
  { id: 'f6', name: 'Персик', category: FlavorCategory.FRUIT, color: '#fdba74', isAvailable: true },
  
  // Berries
  { id: 'b1', name: 'Черника', category: FlavorCategory.BERRY, color: '#3b82f6', isAvailable: true },
  { id: 'b2', name: 'Малина', category: FlavorCategory.BERRY, color: '#ec4899', isAvailable: true },
  { id: 'b3', name: 'Виноград', category: FlavorCategory.BERRY, color: '#a855f7', isAvailable: true },
  { id: 'b4', name: 'Черная Смородина', category: FlavorCategory.BERRY, color: '#7e22ce', isAvailable: true },

  // Mint/Ice
  { id: 'm1', name: 'Супернова (Лед)', category: FlavorCategory.MINT, color: '#bae6fd', isAvailable: true },
  { id: 'm2', name: 'Перечная Мята', category: FlavorCategory.MINT, color: '#22d3ee', isAvailable: true },
  { id: 'm3', name: 'Эвкалипт', category: FlavorCategory.MINT, color: '#06b6d4', isAvailable: true },

  // Dessert
  { id: 'd1', name: 'Ваниль', category: FlavorCategory.DESSERT, color: '#fef08a', isAvailable: true },
  { id: 'd2', name: 'Шоколад', category: FlavorCategory.DESSERT, color: '#78350f', isAvailable: true },
  { id: 'd3', name: 'Чизкейк', category: FlavorCategory.DESSERT, color: '#fff7ed', isAvailable: true },
  { id: 'd4', name: 'Карамель', category: FlavorCategory.DESSERT, color: '#d97706', isAvailable: true },

  // Spice/Tea
  { id: 's1', name: 'Эрл Грей', category: FlavorCategory.SPICE, color: '#b45309', isAvailable: true },
  { id: 's2', name: 'Корица', category: FlavorCategory.SPICE, color: '#9a3412', isAvailable: true },
  { id: 's3', name: 'Пан Раас', category: FlavorCategory.SPICE, color: '#166534', isAvailable: true }, // Spicy Indian flavor

  // Floral
  { id: 'fl1', name: 'Роза', category: FlavorCategory.FLORAL, color: '#be185d', isAvailable: true },
  { id: 'fl2', name: 'Жасмин', category: FlavorCategory.FLORAL, color: '#fbcfe8', isAvailable: true },
];