import type { FC } from 'react';
import { Clock, RefreshCw } from 'lucide-react';
import type { Meal } from '../../lib/types';
import { formatPeso, formatCookingTime } from '../../lib/formatters';

interface MealCardProps {
  meal: Meal;
  onSwap: () => void;
  onClick: () => void;
}

function getDifficultyInfo(cookTime: number): { color: string; label: string } {
  if (cookTime <= 20) return { color: 'bg-green-500', label: 'Easy' };
  if (cookTime <= 45) return { color: 'bg-yellow-500', label: 'Medium' };
  return { color: 'bg-red-500', label: 'Hard' };
}

const MealCard: FC<MealCardProps> = ({ meal, onSwap, onClick }) => {
  const difficulty = getDifficultyInfo(meal.cook_time_minutes);

  return (
    <div
      onClick={onClick}
      className="relative min-h-[120px] rounded-xl bg-white p-4 shadow-[0_2px_12px_rgba(120,90,50,0.08)] cursor-pointer transition-all duration-200 hover:shadow-[0_6px_24px_rgba(120,90,50,0.14)] hover:-translate-y-0.5"
    >
      {/* Swap button — top-left */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onSwap();
        }}
        className="absolute top-2 left-2 flex h-7 w-7 items-center justify-center rounded-full bg-forest-50 text-forest-500 transition-colors hover:bg-forest-100 hover:text-forest-700"
        aria-label="Swap meal"
      >
        <RefreshCw size={14} />
      </button>

      {/* Cost badge — top-right */}
      <span className="absolute top-2 right-2 inline-flex items-center rounded-full bg-gold-400 px-2.5 py-0.5 text-xs font-semibold text-white">
        {formatPeso(meal.estimated_cost)}
      </span>

      {/* Content */}
      <div className="mt-6">
        <p className="font-heading font-bold text-forest-800 text-sm leading-tight">
          {meal.dish_name}
        </p>
        <p className="mt-0.5 text-xs italic text-gray-500 line-clamp-1">
          {meal.description}
        </p>

        {/* Bottom row */}
        <div className="mt-3 flex items-center justify-between">
          <span className="flex items-center gap-1 text-xs text-forest-600">
            <Clock size={12} />
            {formatCookingTime(meal.cook_time_minutes)}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-500">
            <span className={`inline-block h-2 w-2 rounded-full ${difficulty.color}`} />
            {difficulty.label}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
