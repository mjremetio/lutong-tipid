import { useState, useCallback } from 'react';
import type { MealPlanResponse, Meal, GenerateRequest } from '../lib/types';
import { generateMealPlan, swapMeal } from '../lib/api';

interface UseMealPlanReturn {
  mealPlan: MealPlanResponse | null;
  isGenerating: boolean;
  error: string | null;
  generatePlan: (params: GenerateRequest) => Promise<void>;
  swapMeal: (day: string, mealType: string, meal: Meal) => Promise<Meal | null>;
  isSwapping: boolean;
  clearPlan: () => void;
}

export default function useMealPlan(): UseMealPlanReturn {
  const [mealPlan, setMealPlan] = useState<MealPlanResponse | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generatePlan = useCallback(async (params: GenerateRequest) => {
    setIsGenerating(true);
    setError(null);

    try {
      const plan = await generateMealPlan(params);
      setMealPlan(plan);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Something went wrong while generating your meal plan. Please try again.';
      setError(message);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const handleSwapMeal = useCallback(
    async (day: string, mealType: string, _meal: Meal): Promise<Meal | null> => {
      if (!mealPlan) return null;

      setIsSwapping(true);
      setError(null);

      try {
        const newMeal = await swapMeal({
          plan_data: mealPlan,
          day,
          meal_type: mealType,
        });

        // Update the specific meal in the plan state
        setMealPlan((prev) => {
          if (!prev) return prev;

          const updatedDays = prev.days.map((d) => {
            if (d.day !== day) return d;

            const updatedMeals = d.meals.map((m) =>
              m.meal_type === mealType ? newMeal : m
            );

            const newDailyCost = Math.round(
              updatedMeals.reduce((sum, m) => sum + m.estimated_cost, 0) * 100
            ) / 100;

            return { ...d, meals: updatedMeals, daily_cost: newDailyCost };
          });

          const newTotalCost = Math.round(
            updatedDays.reduce((sum, d) => sum + d.daily_cost, 0) * 100
          ) / 100;

          return {
            ...prev,
            days: updatedDays,
            budget_summary: {
              ...prev.budget_summary,
              total_estimated_cost: newTotalCost,
              remaining_budget: prev.budget_summary.weekly_budget - newTotalCost,
            },
          };
        });

        return newMeal;
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : 'Could not swap the meal right now. Please try again.';
        setError(message);
        return null;
      } finally {
        setIsSwapping(false);
      }
    },
    [mealPlan]
  );

  const clearPlan = useCallback(() => {
    setMealPlan(null);
    setError(null);
  }, []);

  return {
    mealPlan,
    isGenerating,
    error,
    generatePlan,
    swapMeal: handleSwapMeal,
    isSwapping,
    clearPlan,
  };
}
