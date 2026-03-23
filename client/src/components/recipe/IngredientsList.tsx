import type { FC } from 'react';
import type { Ingredient } from '../../lib/types';
import { formatPeso } from '../../lib/formatters';

interface IngredientsListProps {
  ingredients: Ingredient[];
  servings: number;
}

const IngredientsList: FC<IngredientsListProps> = ({ ingredients, servings }) => {
  const totalCost = ingredients.reduce((sum, ing) => sum + ing.estimated_cost, 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-heading text-base font-bold text-forest-800">
          Ingredients
        </h3>
        <span className="font-body text-xs text-forest-500">
          {servings} serving{servings !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="divide-y divide-forest-50">
        {ingredients.map((ingredient, index) => (
          <div
            key={`${ingredient.name}-${index}`}
            className="flex items-center justify-between py-2"
          >
            <span className="font-body text-sm text-forest-800 flex-1 min-w-0">
              {ingredient.name}
            </span>
            <span className="font-body text-sm text-forest-600 mx-3 flex-shrink-0">
              {ingredient.quantity}
            </span>
            <span className="font-body text-sm font-medium text-forest-700 w-14 text-right flex-shrink-0">
              {formatPeso(ingredient.estimated_cost)}
            </span>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-2 flex justify-between border-t-2 border-forest-200 pt-2">
        <span className="font-heading text-sm font-bold text-forest-800">
          Total ingredients cost
        </span>
        <span className="font-heading text-sm font-bold text-forest-800">
          {formatPeso(totalCost)}
        </span>
      </div>
    </div>
  );
};

export default IngredientsList;
