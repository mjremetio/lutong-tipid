import { db } from "../db/index.js";
import { mealPlans } from "../db/schema.js";
import { generateChatCompletion } from "./ai/groq.service.js";
import { SYSTEM_001_MEAL_PLAN, SYSTEM_002_SWAP } from "./ai/prompts.js";
import { MealPlanResponseSchema, SwapMealResponseSchema } from "./ai/schemas.js";
import { withRetry } from "./ai/retry.js";
import { estimateIngredientCost } from "../data/ingredients.js";
import type { GenerateRequest, MealPlanResponse, SwapRequest, Meal } from "../types/index.js";

/** Round to 2 decimal places */
function r2(n: number): number {
  return Math.round(n * 100) / 100;
}

/**
 * Correct an ingredient's cost using our price database.
 * ALWAYS prefer our reference price over AI's when available.
 */
function correctIngredientCost(
  ingredient: { name: string; quantity: string; estimated_cost: number },
  _familySize: number
): number {
  const aiCost = ingredient.estimated_cost || 0;
  const MAX_INGREDIENT_COST = 150;

  const refCost = estimateIngredientCost(ingredient.name, ingredient.quantity, _familySize);

  if (refCost !== null) {
    // Always use reference price — AI costs are unreliable
    return Math.min(refCost, MAX_INGREDIENT_COST);
  }

  // Not in our database — cap AI's cost
  return Math.max(2, Math.min(MAX_INGREDIENT_COST, aiCost));
}

/**
 * Recalculate all costs bottom-up from ingredient costs.
 * Corrects AI pricing errors using our ingredient price database,
 * then recalculates all sums so everything adds up correctly.
 */
function recalculatePlanCosts(plan: MealPlanResponse): MealPlanResponse {
  const familySize = plan.family_size || 1;

  const days = plan.days.map((day) => {
    const meals = day.meals.map((meal) => {
      // Correct each ingredient cost, then sum
      const correctedIngredients = meal.ingredients.map((ing) => ({
        ...ing,
        estimated_cost: r2(correctIngredientCost(ing, familySize)),
      }));
      const ingredientTotal = correctedIngredients.reduce(
        (sum, ing) => sum + ing.estimated_cost,
        0
      );
      return { ...meal, ingredients: correctedIngredients, estimated_cost: r2(ingredientTotal) };
    });

    // Daily cost = sum of meal costs
    const dailyCost = meals.reduce((sum, m) => sum + m.estimated_cost, 0);
    return { ...day, meals, daily_cost: r2(dailyCost) };
  });

  // Total cost = sum of daily costs
  const totalCost = r2(days.reduce((sum, d) => sum + d.daily_cost, 0));
  const weeklyBudget = plan.weekly_budget;
  const costPerPersonPerDay = familySize > 0
    ? r2(totalCost / (familySize * 7))
    : 0;

  // Recalculate grocery list item totals
  const groceryList = plan.grocery_list.map((cat) => ({
    ...cat,
    items: cat.items.map((item) => ({
      ...item,
      estimated_cost: r2(item.estimated_cost || 0),
    })),
  }));

  return {
    ...plan,
    days,
    grocery_list: groceryList,
    budget_summary: {
      weekly_budget: weeklyBudget,
      total_estimated_cost: totalCost,
      remaining_budget: r2(weeklyBudget - totalCost),
      cost_per_person_per_day: costPerPersonPerDay,
    },
  };
}

/** Recalculate a single swapped meal's cost from its ingredients, correcting prices */
function recalculateMealCost(meal: Meal, familySize: number = 4): Meal {
  const correctedIngredients = meal.ingredients.map((ing) => ({
    ...ing,
    estimated_cost: r2(correctIngredientCost(ing, familySize)),
  }));
  const ingredientTotal = correctedIngredients.reduce(
    (sum, ing) => sum + ing.estimated_cost,
    0
  );
  return { ...meal, ingredients: correctedIngredients, estimated_cost: r2(ingredientTotal) };
}

export async function generateMealPlan(params: GenerateRequest): Promise<MealPlanResponse> {
  const { system, user } = SYSTEM_001_MEAL_PLAN({
    weekly_budget: params.weekly_budget,
    family_size: params.family_size,
    meals_per_day: params.meals_per_day,
    dietary_restrictions: params.dietary_restrictions,
    region: params.region,
  });

  const result = await withRetry(
    () => generateChatCompletion(system, user, { temperature: 0.7, maxTokens: 8192 }),
    (data) => {
      const validated = MealPlanResponseSchema.parse(data);

      // Recalculate all costs from ingredients (fixes AI math)
      const fixed = recalculatePlanCosts(validated);

      // Log if over budget but still return the plan (AI + price correction may exceed)
      if (fixed.budget_summary.total_estimated_cost > params.weekly_budget) {
        console.warn(
          `Plan cost PHP ${fixed.budget_summary.total_estimated_cost} exceeds budget PHP ${params.weekly_budget} — returning anyway`
        );
      }

      return fixed;
    },
    2
  );

  // Save to database
  try {
    const [saved] = await db
      .insert(mealPlans)
      .values({
        weekly_budget: params.weekly_budget,
        family_size: params.family_size,
        meals_per_day: params.meals_per_day,
        dietary_restrictions: params.dietary_restrictions ?? null,
        region: params.region ?? "NCR",
        total_cost: result.budget_summary.total_estimated_cost,
        plan_data: result,
      })
      .returning({ id: mealPlans.id });

    return { ...result, plan_id: saved.id };
  } catch (dbError) {
    // If DB save fails (e.g. no DB configured), still return the plan
    console.warn("Could not save plan to database:", dbError);
    return result;
  }
}

export async function swapMeal(params: SwapRequest): Promise<Meal> {
  const { plan_data, day, meal_type, reason } = params;

  // Find the current meal
  const dayData = plan_data.days.find((d) => d.day.toLowerCase() === day.toLowerCase());
  if (!dayData) {
    throw new Error(`Day "${day}" not found in plan`);
  }

  const currentMeal = dayData.meals.find(
    (m) => m.meal_type.toLowerCase() === meal_type.toLowerCase()
  );
  if (!currentMeal) {
    throw new Error(`Meal type "${meal_type}" not found on ${day}`);
  }

  const { system, user } = SYSTEM_002_SWAP({
    day,
    meal_type,
    current_dish: currentMeal.dish_name,
    current_ingredients: currentMeal.ingredients.map((i) => i.name),
    budget_remaining: plan_data.budget_summary.remaining_budget,
    family_size: plan_data.family_size,
    reason,
  });

  const result = await withRetry(
    () => generateChatCompletion(system, user, { temperature: 0.8, maxTokens: 2048 }),
    (data) => SwapMealResponseSchema.parse(data),
    2
  );

  // Recalculate the swapped meal's cost from its ingredients
  return recalculateMealCost(result.meal, plan_data.family_size);
}
