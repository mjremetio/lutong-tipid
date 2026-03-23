import { useState, useEffect, useRef } from 'react';
import type { FeasibilityResponse } from '../lib/types';
import { validateBudget } from '../lib/api';

interface UseBudgetCalculatorReturn {
  feasibility: FeasibilityResponse | null;
  isChecking: boolean;
  checkFeasibility: (budget: number, familySize: number, meals: string[]) => void;
}

export default function useBudgetCalculator(): UseBudgetCalculatorReturn {
  const [feasibility, setFeasibility] = useState<FeasibilityResponse | null>(
    null
  );
  const [isChecking, setIsChecking] = useState(false);
  const [pendingParams, setPendingParams] = useState<{
    budget: number;
    familySize: number;
    meals: string[];
  } | null>(null);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function checkFeasibility(
    budget: number,
    familySize: number,
    meals: string[]
  ) {
    setPendingParams({ budget, familySize, meals });
  }

  useEffect(() => {
    if (!pendingParams) return;

    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(async () => {
      setIsChecking(true);
      try {
        const result = await validateBudget({
          weekly_budget: pendingParams.budget,
          family_size: pendingParams.familySize,
          meals_per_day: pendingParams.meals,
        });
        setFeasibility(result);
      } catch {
        setFeasibility(null);
      } finally {
        setIsChecking(false);
      }
    }, 500);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [pendingParams]);

  return {
    feasibility,
    isChecking,
    checkFeasibility,
  };
}
