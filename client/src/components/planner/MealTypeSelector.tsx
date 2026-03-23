import { Check } from 'lucide-react';
import { MEAL_TYPES } from '../../lib/constants';

interface MealTypeSelectorProps {
  selected: string[];
  onChange: (meals: string[]) => void;
}

const EMOJI_MAP: Record<string, string> = {
  breakfast: '🌅',
  lunch: '🌤️',
  merienda: '🍵',
  dinner: '🌙',
};

export default function MealTypeSelector({
  selected,
  onChange,
}: MealTypeSelectorProps) {
  function toggle(id: string) {
    if (selected.includes(id)) {
      // Prevent deselecting last one
      if (selected.length <= 1) return;
      onChange(selected.filter((s) => s !== id));
    } else {
      onChange([...selected, id]);
    }
  }

  return (
    <div>
      <label className="block font-heading text-sm font-semibold text-forest-700 mb-2">
        Meals to Plan
      </label>

      <div className="grid grid-cols-2 gap-3">
        {MEAL_TYPES.map((meal) => {
          const isSelected = selected.includes(meal.id);
          return (
            <button
              key={meal.id}
              type="button"
              onClick={() => toggle(meal.id)}
              className={`relative flex items-center gap-2 rounded-xl border-2 px-4 py-3 text-left text-sm font-semibold transition ${
                isSelected
                  ? 'border-forest-600 bg-forest-600 text-white'
                  : 'border-forest-200 bg-white text-forest-700 hover:border-forest-400'
              }`}
            >
              <span className="text-lg">{EMOJI_MAP[meal.id] ?? meal.emoji}</span>
              <span>
                {meal.labelFil}
                <span
                  className={`block text-xs font-normal ${
                    isSelected ? 'text-white/80' : 'text-gray-400'
                  }`}
                >
                  {meal.label}
                </span>
              </span>
              {isSelected && (
                <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
