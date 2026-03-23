import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import type { GenerateRequest, FeasibilityResponse } from '../../lib/types';
import {
  DEFAULT_BUDGET,
  DEFAULT_FAMILY_SIZE,
  REGIONS,
} from '../../lib/constants';
import { validateBudget } from '../../lib/api';
import BudgetSlider from './BudgetSlider';
import FamilySizeSelector from './FamilySizeSelector';
import MealTypeSelector from './MealTypeSelector';
import DietaryPreferences from './DietaryPreferences';
import RegionSelector from './RegionSelector';
import FeasibilityBanner from './FeasibilityBanner';

interface BudgetFormProps {
  onSubmit: (params: GenerateRequest) => void;
  isLoading: boolean;
}

export default function BudgetForm({ onSubmit, isLoading }: BudgetFormProps) {
  const [budget, setBudget] = useState(DEFAULT_BUDGET);
  const [familySize, setFamilySize] = useState(DEFAULT_FAMILY_SIZE);
  const [meals, setMeals] = useState<string[]>(['breakfast', 'lunch', 'dinner']);
  const [dietary, setDietary] = useState<string[]>([]);
  const [region, setRegion] = useState<string>(REGIONS[0].id);
  const [feasibility, setFeasibility] = useState<FeasibilityResponse | null>(
    null
  );

  // Debounced feasibility check
  useEffect(() => {
    const timer = setTimeout(() => {
      const params: GenerateRequest = {
        weekly_budget: budget,
        family_size: familySize,
        meals_per_day: meals,
        dietary_restrictions: dietary.length > 0 ? dietary : undefined,
        region,
      };

      validateBudget(params)
        .then(setFeasibility)
        .catch(() => setFeasibility(null));
    }, 500);

    return () => clearTimeout(timer);
  }, [budget, familySize, meals, dietary, region]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      weekly_budget: budget,
      family_size: familySize,
      meals_per_day: meals,
      dietary_restrictions: dietary.length > 0 ? dietary : undefined,
      region,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <BudgetSlider value={budget} onChange={setBudget} />
      <FamilySizeSelector value={familySize} onChange={setFamilySize} />
      <MealTypeSelector selected={meals} onChange={setMeals} />
      <DietaryPreferences selected={dietary} onChange={setDietary} />
      <RegionSelector value={region} onChange={setRegion} />
      <FeasibilityBanner feasibility={feasibility} />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-2xl bg-forest-600 px-6 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-forest-500 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Generating...
          </>
        ) : (
          'Gawa ng Meal Plan! 🍳'
        )}
      </button>
    </form>
  );
}
