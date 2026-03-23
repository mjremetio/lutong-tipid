import { useState, useMemo, useCallback } from 'react';
import type {
  MealPlanResponse,
  GroceryCategory,
  BudgetSummary,
} from '../lib/types';

interface UseGroceryListReturn {
  groceryList: GroceryCategory[];
  budgetSummary: BudgetSummary;
  isVisible: boolean;
  showGrocery: () => void;
  hideGrocery: () => void;
}

const emptyBudgetSummary: BudgetSummary = {
  weekly_budget: 0,
  total_estimated_cost: 0,
  remaining_budget: 0,
  cost_per_person_per_day: 0,
};

export default function useGroceryList(
  mealPlan: MealPlanResponse | null
): UseGroceryListReturn {
  const [isVisible, setIsVisible] = useState(false);

  const groceryList = useMemo<GroceryCategory[]>(
    () => mealPlan?.grocery_list ?? [],
    [mealPlan]
  );

  const budgetSummary = useMemo<BudgetSummary>(
    () => mealPlan?.budget_summary ?? emptyBudgetSummary,
    [mealPlan]
  );

  const showGrocery = useCallback(() => setIsVisible(true), []);
  const hideGrocery = useCallback(() => setIsVisible(false), []);

  return {
    groceryList,
    budgetSummary,
    isVisible,
    showGrocery,
    hideGrocery,
  };
}
