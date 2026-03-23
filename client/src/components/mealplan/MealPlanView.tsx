import { useState, type FC } from 'react';
import { RefreshCw, ShoppingCart, FileText, FileSpreadsheet, Printer } from 'lucide-react';
import type { MealPlanResponse, Meal } from '../../lib/types';
import { mealPlanToText, mealPlanToCsv, downloadText, downloadCsv, printMealPlan } from '../../lib/exporters';
import Button from '../ui/Button';
import ExportMenu from '../ui/ExportMenu';
import BudgetProgressBar from './BudgetProgressBar';
import DayColumn from './DayColumn';
import SwapMealModal from './SwapMealModal';

interface MealPlanViewProps {
  mealPlan: MealPlanResponse;
  onSwapMeal: (day: string, mealType: string, meal: Meal) => void;
  onViewRecipe: (meal: Meal) => void;
  onRegenerate: () => void;
  onViewGrocery: () => void;
}

interface SwapState {
  isOpen: boolean;
  day: string;
  mealType: string;
  meal: Meal | null;
  newMeal: Meal | null;
  isLoading: boolean;
}

const MealPlanView: FC<MealPlanViewProps> = ({
  mealPlan,
  onSwapMeal,
  onViewRecipe,
  onRegenerate,
  onViewGrocery,
}) => {
  const [swapState, setSwapState] = useState<SwapState>({
    isOpen: false,
    day: '',
    mealType: '',
    meal: null,
    newMeal: null,
    isLoading: false,
  });

  const handleOpenSwap = (day: string, meal: Meal) => {
    setSwapState({
      isOpen: true,
      day,
      mealType: meal.meal_type,
      meal,
      newMeal: null,
      isLoading: true,
    });
    onSwapMeal(day, meal.meal_type, meal);
  };

  const handleCloseSwap = () => {
    setSwapState({
      isOpen: false,
      day: '',
      mealType: '',
      meal: null,
      newMeal: null,
      isLoading: false,
    });
  };

  const handleConfirmSwap = () => {
    if (swapState.meal) {
      onSwapMeal(swapState.day, swapState.mealType, swapState.meal);
    }
  };

  return (
    <div className="relative">
      {/* Budget progress — sticky top */}
      <BudgetProgressBar
        totalCost={mealPlan.budget_summary.total_estimated_cost}
        weeklyBudget={mealPlan.budget_summary.weekly_budget}
      />

      {/* Desktop: 7-column grid */}
      <div className="mt-4 hidden md:grid md:grid-cols-7 md:gap-2 md:overflow-x-auto">
        {mealPlan.days.map((day) => (
          <DayColumn
            key={day.day}
            day={day}
            onSwapMeal={(meal) => handleOpenSwap(day.day, meal)}
            onViewRecipe={onViewRecipe}
          />
        ))}
      </div>

      {/* Mobile: vertical list */}
      <div className="mt-4 flex flex-col gap-6 md:hidden">
        {mealPlan.days.map((day) => (
          <DayColumn
            key={day.day}
            day={day}
            onSwapMeal={(meal) => handleOpenSwap(day.day, meal)}
            onViewRecipe={onViewRecipe}
          />
        ))}
      </div>

      {/* Action buttons */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Button variant="outline" onClick={onRegenerate}>
          <RefreshCw size={16} />
          Regenerate All
        </Button>

        <ExportMenu
          label="Export Meal Plan"
          options={[
            {
              label: 'Download as Text',
              icon: FileText,
              onClick: () => downloadText(mealPlanToText(mealPlan), 'lutong-tipid-meal-plan.txt'),
            },
            {
              label: 'Download as CSV',
              icon: FileSpreadsheet,
              onClick: () => downloadCsv(mealPlanToCsv(mealPlan), 'lutong-tipid-meal-plan.csv'),
            },
            {
              label: 'Print Meal Plan',
              icon: Printer,
              onClick: () => printMealPlan(mealPlan),
            },
          ]}
        />
      </div>

      {/* Grocery list button — floating on mobile, inline on desktop */}
      <div className="hidden md:flex md:justify-center md:mt-4">
        <Button variant="secondary" onClick={onViewGrocery}>
          <ShoppingCart size={16} />
          View Grocery List
        </Button>
      </div>

      <button
        onClick={onViewGrocery}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gold-400 text-white shadow-lg transition-transform hover:scale-105 active:scale-95 md:hidden"
        aria-label="View Grocery List"
      >
        <ShoppingCart size={24} />
      </button>

      {/* Swap modal */}
      <SwapMealModal
        isOpen={swapState.isOpen}
        onClose={handleCloseSwap}
        meal={swapState.meal}
        onConfirmSwap={handleConfirmSwap}
        isLoading={swapState.isLoading}
        newMeal={swapState.newMeal}
      />
    </div>
  );
};

export default MealPlanView;
