import { db } from "../db/index.js";
import { mealPlans } from "../db/schema.js";
import { generateChatCompletion } from "./ai/groq.service.js";
import { SYSTEM_001_MEAL_PLAN, SYSTEM_002_SWAP } from "./ai/prompts.js";
import { MealPlanResponseSchema, SwapMealResponseSchema } from "./ai/schemas.js";
import { withRetry } from "./ai/retry.js";
import type { GenerateRequest, MealPlanResponse, SwapRequest, Meal } from "../types/index.js";

/** Round to 2 decimal places */
function r2(n: number): number {
  return Math.round(n * 100) / 100;
}

/**
 * Recalculate all costs bottom-up from ingredient costs.
 * Fixes AI math inconsistencies so everything adds up correctly.
 */
function recalculatePlanCosts(plan: MealPlanResponse): MealPlanResponse {
  const days = plan.days.map((day) => {
    const meals = day.meals.map((meal) => {
      // Meal cost = sum of ingredient costs
      const ingredientTotal = meal.ingredients.reduce(
        (sum, ing) => sum + (ing.estimated_cost || 0),
        0
      );
      return { ...meal, estimated_cost: r2(ingredientTotal) };
    });

    // Daily cost = sum of meal costs
    const dailyCost = meals.reduce((sum, m) => sum + m.estimated_cost, 0);
    return { ...day, meals, daily_cost: r2(dailyCost) };
  });

  // Total cost = sum of daily costs
  const totalCost = r2(days.reduce((sum, d) => sum + d.daily_cost, 0));
  const weeklyBudget = plan.weekly_budget;
  const familySize = plan.family_size;
  const totalMeals = days.reduce((sum, d) => sum + d.meals.length, 0);
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

/** Recalculate a single swapped meal's cost from its ingredients */
function recalculateMealCost(meal: Meal): Meal {
  const ingredientTotal = meal.ingredients.reduce(
    (sum, ing) => sum + (ing.estimated_cost || 0),
    0
  );
  return { ...meal, estimated_cost: r2(ingredientTotal) };
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

      // Check budget constraint after recalculation
      if (fixed.budget_summary.total_estimated_cost > params.weekly_budget * 1.10) {
        throw new Error(
          `Generated plan cost (PHP ${fixed.budget_summary.total_estimated_cost}) exceeds budget (PHP ${params.weekly_budget})`
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
  return recalculateMealCost(result.meal);
}
