import type { FC } from 'react';
import { Clock } from 'lucide-react';
import type { Meal, RecipeResponse } from '../../lib/types';
import { formatPeso, formatCookingTime } from '../../lib/formatters';
import Modal from '../ui/Modal';
import Spinner from '../ui/Spinner';
import Badge from '../ui/Badge';
import IngredientsList from './IngredientsList';
import RecipeSteps from './RecipeSteps';
import TipsNiNanay from './TipsNiNanay';

interface RecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  meal: Meal | null;
  recipe: RecipeResponse | null;
  isLoading: boolean;
  familySize: number;
}

function getDifficultyBadge(cookTime: number): { variant: 'green' | 'yellow' | 'red'; label: string } {
  if (cookTime <= 20) return { variant: 'green', label: 'Easy' };
  if (cookTime <= 45) return { variant: 'yellow', label: 'Medium' };
  return { variant: 'red', label: 'Hard' };
}

const RecipeModal: FC<RecipeModalProps> = ({
  isOpen,
  onClose,
  meal,
  recipe,
  isLoading,
  familySize,
}) => {
  const title = meal?.dish_name ?? 'Recipe';
  const difficulty = meal ? getDifficultyBadge(meal.cook_time_minutes) : null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="full">
      {/* Loading state */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <Spinner size="lg" color="forest" />
          <p className="font-heading text-forest-700">Loading recipe...</p>
        </div>
      )}

      {/* Recipe content */}
      {!isLoading && meal && recipe && (
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h2 className="font-heading text-2xl font-bold text-forest-800">
              {recipe.dish_name}
            </h2>
            <p className="mt-1 font-body text-sm italic text-gray-500">
              {recipe.description}
            </p>

            {/* Info row */}
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1 font-body text-sm text-forest-600">
                <Clock size={14} />
                {formatCookingTime(recipe.total_time_minutes)}
              </span>
              {difficulty && (
                <Badge variant={difficulty.variant}>{difficulty.label}</Badge>
              )}
              <Badge variant="gold">
                {formatPeso(recipe.estimated_cost / (recipe.servings || familySize))}/serving
              </Badge>
              <span className="font-body text-sm text-forest-600">
                {recipe.servings} serving{recipe.servings !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* Ingredients */}
          <IngredientsList
            ingredients={recipe.ingredients}
            servings={recipe.servings}
          />

          {/* Steps */}
          <RecipeSteps steps={recipe.steps} />

          {/* Tips ni Nanay */}
          <TipsNiNanay tips={recipe.tips} />

          {/* Storage & reheating info */}
          {meal.description && (
            <div className="rounded-xl bg-gray-50 px-5 py-4">
              <h3 className="font-heading text-sm font-bold text-gray-700 mb-2">
                Storage & Reheating
              </h3>
              <p className="font-body text-sm text-gray-600 leading-relaxed">
                Store leftovers in an airtight container in the refrigerator for up to
                2-3 days. Reheat thoroughly in a pot over medium heat or microwave until
                steaming hot. Add a splash of water if the dish dries out.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !recipe && !meal && (
        <div className="flex items-center justify-center py-16">
          <p className="font-body text-sm text-gray-400">No recipe selected.</p>
        </div>
      )}
    </Modal>
  );
};

export default RecipeModal;
