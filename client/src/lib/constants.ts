export const MEAL_TYPES = [
  { id: 'breakfast', label: 'Breakfast', labelFil: 'Almusal', emoji: '🍳' },
  { id: 'lunch', label: 'Lunch', labelFil: 'Tanghalian', emoji: '🍛' },
  { id: 'merienda', label: 'Merienda', labelFil: 'Meryenda', emoji: '🍡' },
  { id: 'dinner', label: 'Dinner', labelFil: 'Hapunan', emoji: '🥘' },
] as const;

export const DIETARY_OPTIONS = [
  { id: 'none', label: 'No restrictions' },
  { id: 'no_pork', label: 'No pork' },
  { id: 'no_beef', label: 'No beef' },
  { id: 'no_seafood', label: 'No seafood' },
  { id: 'pescatarian', label: 'Pescatarian' },
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'low_sodium', label: 'Low sodium' },
  { id: 'low_sugar', label: 'Low sugar' },
] as const;

export const REGIONS = [
  { id: 'metro_manila', label: 'Metro Manila' },
  { id: 'luzon', label: 'Luzon (Provincial)' },
  { id: 'visayas', label: 'Visayas' },
  { id: 'mindanao', label: 'Mindanao' },
] as const;

export const DEFAULT_FAMILY_SIZE = 4;
export const MIN_BUDGET = 500;
export const MAX_BUDGET = 10000;
export const BUDGET_STEP = 100;
export const DEFAULT_BUDGET = 2500;

export const LOADING_MESSAGES = [
  'Nagsasaing ng kanin...',
  'Pinipili ang pinakapreskong gulay...',
  'Nag-iisip ng masarap na ulam...',
  'Binibilang ang budget mo...',
  'Hinahalo ang sangkap...',
  'Tinitikman kung tama na ang lasa...',
  'Naghahanap ng pinakamura sa palengke...',
  'Naghahanda ng grocery list...',
  'Kinakalkula ang sustansya...',
  'Inaayos ang meal plan mo...',
  'Nagpapakulo ng sabaw...',
  'Sinisigang ang baboy... este, iniisip pa...',
  'Niluluto ang plano mo nang may pagmamahal...',
  'Halos tapos na, konting tiis lang...',
] as const;
