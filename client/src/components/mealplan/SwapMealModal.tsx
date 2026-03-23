import type { FC } from 'react';
import { ArrowRight, RefreshCw } from 'lucide-react';
import type { Meal } from '../../lib/types';
import { formatPeso, formatCookingTime } from '../../lib/formatters';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';

interface SwapMealModalProps {
  isOpen: boolean;
  onClose: () => void;
  meal: Meal | null;
  onConfirmSwap: () => void;
  isLoading: boolean;
  newMeal: Meal | null;
}

const MealInfo: FC<{ meal: Meal; strikethrough?: boolean }> = ({ meal, strikethrough }) => (
  <div className={`flex-1 rounded-xl p-3 ${strikethrough ? 'bg-gray-50 opacity-60' : 'bg-forest-50 ring-2 ring-forest-300'}`}>
    <p className={`font-heading font-bold text-forest-800 text-sm ${strikethrough ? 'line-through' : ''}`}>
      {meal.dish_name}
    </p>
    <p className="mt-0.5 text-xs italic text-gray-500">{meal.description}</p>
    <div className="mt-2 flex items-center justify-between text-xs text-forest-600">
      <span>{formatCookingTime(meal.cook_time_minutes)}</span>
      <span className="font-semibold">{formatPeso(meal.estimated_cost)}</span>
    </div>
  </div>
);

const SwapMealModal: FC<SwapMealModalProps> = ({
  isOpen,
  onClose,
  meal,
  onConfirmSwap,
  isLoading,
  newMeal,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Swap Meal" size="md">
      {meal && !isLoading && !newMeal && (
        <div>
          <p className="font-body text-sm text-forest-700 mb-3">
            Current dish:
          </p>
          <MealInfo meal={meal} />
          <p className="font-body text-sm text-gray-500 mt-4 text-center">
            Finding a replacement...
          </p>
        </div>
      )}

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-10 gap-4">
          <Spinner size="lg" color="forest" />
          <p className="font-heading text-forest-700">Finding a new dish...</p>
        </div>
      )}

      {meal && newMeal && !isLoading && (
        <div>
          {/* Comparison */}
          <div className="flex items-center gap-3">
            <MealInfo meal={meal} strikethrough />
            <ArrowRight size={20} className="text-forest-400 flex-shrink-0" />
            <MealInfo meal={newMeal} />
          </div>

          {/* Cost comparison */}
          <div className="mt-4 rounded-lg bg-cream p-3 text-center">
            <span className="font-body text-sm text-forest-700">
              Cost change:{' '}
              <span className="font-semibold">
                {formatPeso(meal.estimated_cost)}
              </span>
              {' → '}
              <span className="font-semibold text-forest-700">
                {formatPeso(newMeal.estimated_cost)}
              </span>
              {newMeal.estimated_cost <= meal.estimated_cost ? (
                <span className="ml-2 text-green-600 text-xs font-semibold">
                  Save {formatPeso(meal.estimated_cost - newMeal.estimated_cost)}
                </span>
              ) : (
                <span className="ml-2 text-red-600 text-xs font-semibold">
                  +{formatPeso(newMeal.estimated_cost - meal.estimated_cost)}
                </span>
              )}
            </span>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="ghost" size="sm" onClick={onConfirmSwap}>
              <RefreshCw size={14} />
              Try Another
            </Button>
            <Button variant="primary" size="sm" onClick={onConfirmSwap}>
              Confirm Swap
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default SwapMealModal;
