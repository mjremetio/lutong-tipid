import type { FC } from 'react';
import type { Day, Meal } from '../../lib/types';
import { formatPeso } from '../../lib/formatters';
import Badge from '../ui/Badge';
import MealCard from './MealCard';

interface DayColumnProps {
  day: Day;
  onSwapMeal: (meal: Meal) => void;
  onViewRecipe: (meal: Meal) => void;
}

const DayColumn: FC<DayColumnProps> = ({ day, onSwapMeal, onViewRecipe }) => {
  return (
    <div className="border-l-2 border-forest-200 pl-4 md:pl-3 bg-white rounded-lg transition-colors hover:bg-forest-50/30">
      {/* Day header */}
      <div className="flex items-center justify-between py-3 pr-2">
        <h3 className="font-heading font-semibold text-forest-800">{day.day}</h3>
        <Badge variant="gold">{formatPeso(day.daily_cost)}</Badge>
      </div>

      {/* Meal cards */}
      <div className="flex flex-col gap-3 pb-4 pr-2">
        {day.meals.map((meal) => (
          <MealCard
            key={`${day.day}-${meal.meal_type}`}
            meal={meal}
            onSwap={() => onSwapMeal(meal)}
            onClick={() => onViewRecipe(meal)}
          />
        ))}
      </div>
    </div>
  );
};

export default DayColumn;
