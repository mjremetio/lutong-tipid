import { useState, useCallback } from 'react';
import { ArrowLeft } from 'lucide-react';
import type { GenerateRequest, Meal, RecipeResponse } from '../lib/types';
import { getRecipe } from '../lib/api';
import useMealPlan from '../hooks/useMealPlan';
import useGroceryList from '../hooks/useGroceryList';
import BudgetForm from '../components/planner/BudgetForm';
import LoadingState from '../components/mealplan/LoadingState';
import MealPlanView from '../components/mealplan/MealPlanView';
import GroceryList from '../components/grocery/GroceryList';
import RecipeModal from '../components/recipe/RecipeModal';
import Toast from '../components/ui/Toast';

type View = 'form' | 'loading' | 'mealplan' | 'grocery';

export default function PlannerPage() {
  const [view, setView] = useState<View>('form');
  const [formParams, setFormParams] = useState<GenerateRequest | null>(null);

  // Meal plan hook
  const {
    mealPlan,
    error,
    generatePlan,
    swapMeal,
    clearPlan,
  } = useMealPlan();

  // Grocery list hook
  const { groceryList, budgetSummary } = useGroceryList(mealPlan);

  // Recipe modal state
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [recipe, setRecipe] = useState<RecipeResponse | null>(null);
  const [isRecipeLoading, setIsRecipeLoading] = useState(false);
  const [isRecipeOpen, setIsRecipeOpen] = useState(false);

  // Swap state (kept for future swap modal UI)

  // Error toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // ── Form submission ──
  const handleFormSubmit = useCallback(
    async (params: GenerateRequest) => {
      setFormParams(params);
      setView('loading');
      await generatePlan(params);
      setView('mealplan');
    },
    [generatePlan]
  );

  // ── Regenerate ──
  const handleRegenerate = useCallback(async () => {
    if (!formParams) return;
    setView('loading');
    await generatePlan(formParams);
    setView('mealplan');
  }, [formParams, generatePlan]);

  // ── Swap meal ──
  const handleSwapMeal = useCallback(
    async (day: string, mealType: string, meal: Meal) => {
      await swapMeal(day, mealType, meal);
    },
    [swapMeal]
  );

  // ── View recipe ──
  const handleViewRecipe = useCallback(
    async (meal: Meal) => {
      setSelectedMeal(meal);
      setRecipe(null);
      setIsRecipeLoading(true);
      setIsRecipeOpen(true);

      try {
        const ingredientNames = meal.ingredients.map((i) => i.name);
        const familySize = mealPlan?.family_size ?? 4;
        const result = await getRecipe(meal.dish_name, familySize, ingredientNames);
        setRecipe(result);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Failed to load recipe.';
        setToastMessage(message);
      } finally {
        setIsRecipeLoading(false);
      }
    },
    [mealPlan]
  );

  const handleCloseRecipe = useCallback(() => {
    setIsRecipeOpen(false);
    setSelectedMeal(null);
    setRecipe(null);
  }, []);

  // ── View grocery ──
  const handleViewGrocery = useCallback(() => setView('grocery'), []);

  // ── Back navigation ──
  const handleBackToForm = useCallback(() => {
    clearPlan();
    setView('form');
    setFormParams(null);
  }, [clearPlan]);

  const handleBackToMealPlan = useCallback(() => setView('mealplan'), []);

  // ── Show error from hook as toast ──
  const displayError = error || toastMessage;

  // Pass the budget summary directly — GroceryList now uses shared BudgetSummary type
  const groceryBudgetSummary = budgetSummary;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* ── Form View ── */}
      {view === 'form' && (
        <div className="mx-auto max-w-xl">
          <h1 className="mb-8 text-center font-heading text-3xl font-bold text-forest-800">
            Plan Your Weekly Meals
          </h1>
          <BudgetForm onSubmit={handleFormSubmit} isLoading={false} />
        </div>
      )}

      {/* ── Loading View ── */}
      {view === 'loading' && <LoadingState isVisible />}

      {/* ── Meal Plan View ── */}
      {view === 'mealplan' && mealPlan && (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <button
              onClick={handleBackToForm}
              className="flex items-center gap-1 font-body text-sm text-forest-600 transition hover:text-forest-800"
            >
              <ArrowLeft size={16} />
              Edit Budget
            </button>
          </div>

          <MealPlanView
            mealPlan={mealPlan}
            onSwapMeal={handleSwapMeal}
            onViewRecipe={handleViewRecipe}
            onRegenerate={handleRegenerate}
            onViewGrocery={handleViewGrocery}
          />
        </div>
      )}

      {/* ── Meal Plan View (error, no plan) ── */}
      {view === 'mealplan' && !mealPlan && error && (
        <div className="mx-auto max-w-xl text-center py-16">
          <p className="font-heading text-xl text-red-600 mb-4">{error}</p>
          <button
            onClick={handleBackToForm}
            className="rounded-2xl bg-forest-600 px-6 py-3 font-bold text-white shadow transition hover:bg-forest-500 active:scale-[0.98]"
          >
            Back to Form
          </button>
        </div>
      )}

      {/* ── Grocery View ── */}
      {view === 'grocery' && (
        <div>
          <button
            onClick={handleBackToMealPlan}
            className="mb-4 flex items-center gap-1 font-body text-sm text-forest-600 transition hover:text-forest-800"
          >
            <ArrowLeft size={16} />
            Back to Meal Plan
          </button>

          <h2 className="mb-4 font-heading text-2xl font-bold text-forest-800">
            Grocery List
          </h2>

          <GroceryList
            groceryList={groceryList}
            budgetSummary={groceryBudgetSummary}
          />
        </div>
      )}

      {/* ── Recipe Modal ── */}
      <RecipeModal
        isOpen={isRecipeOpen}
        onClose={handleCloseRecipe}
        meal={selectedMeal}
        recipe={recipe}
        isLoading={isRecipeLoading}
        familySize={mealPlan?.family_size ?? formParams?.family_size ?? 4}
      />

      {/* ── Error / Info Toast ── */}
      {displayError && (
        <Toast
          message={displayError}
          type="error"
          isVisible={!!displayError}
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  );
}
