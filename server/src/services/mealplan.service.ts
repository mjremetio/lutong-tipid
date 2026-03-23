import { db } from "../db";
import { mealPlans } from "../db/schema";
import { generateChatCompletion } from "./ai/groq.service";
import { SYSTEM_001_MEAL_PLAN, SYSTEM_002_SWAP } from "./ai/prompts";
import { MealPlanResponseSchema, SwapMealResponseSchema } from "./ai/schemas";
import { withRetry } from "./ai/retry";
import type { GenerateRequest, MealPlanResponse, SwapRequest, Meal } from "../types";

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

      // Check budget constraint
      if (validated.budget_summary.total_estimated_cost > params.weekly_budget * 1.05) {
        throw new Error(
          `Generated plan cost (PHP ${validated.budget_summary.total_estimated_cost}) exceeds budget (PHP ${params.weekly_budget})`
        );
      }

      return validated;
    },
    2
  );

  // Save to database
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

  return {
    ...result,
    plan_id: saved.id,
  };
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

  return result.meal;
}
