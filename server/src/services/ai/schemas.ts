import { z } from "zod";

// --- Request Validation Schemas ---

export const GenerateRequestSchema = z.object({
  weekly_budget: z.number().min(100).max(100000),
  family_size: z.number().int().min(1).max(50),
  meals_per_day: z.array(z.string()).min(1).max(4),
  dietary_restrictions: z.array(z.string()).optional(),
  region: z.string().optional(),
});

export const SwapRequestSchema = z.object({
  plan_data: z.object({
    family_size: z.number(),
    weekly_budget: z.number(),
    region: z.string(),
    days: z.array(z.object({
      day: z.string(),
      meals: z.array(z.object({
        meal_type: z.string(),
        dish_name: z.string(),
        description: z.string(),
        ingredients: z.array(z.object({
          name: z.string(),
          quantity: z.string(),
          estimated_cost: z.number(),
        })),
        estimated_cost: z.number(),
        nutrition_estimate: z.object({
          calories: z.number(),
          protein: z.string(),
          carbs: z.string(),
          fat: z.string(),
        }),
        cook_time_minutes: z.number(),
      })),
      daily_cost: z.number(),
    })),
    grocery_list: z.array(z.object({
      category: z.string(),
      items: z.array(z.object({
        name: z.string(),
        quantity: z.string(),
        estimated_cost: z.number(),
        store_section: z.string(),
      })),
    })),
    budget_summary: z.object({
      weekly_budget: z.number(),
      total_estimated_cost: z.number(),
      remaining_budget: z.number(),
      cost_per_person_per_day: z.number(),
    }),
    tips: z.array(z.string()),
  }),
  day: z.string(),
  meal_type: z.string(),
  reason: z.string().optional(),
});

// --- AI Response Validation Schemas ---

const IngredientSchema = z.object({
  name: z.string(),
  quantity: z.string(),
  estimated_cost: z.number(),
});

const NutritionEstimateSchema = z.object({
  calories: z.number(),
  protein: z.string(),
  carbs: z.string(),
  fat: z.string(),
});

const MealSchema = z.object({
  meal_type: z.string(),
  dish_name: z.string(),
  description: z.string(),
  ingredients: z.array(IngredientSchema),
  estimated_cost: z.number(),
  nutrition_estimate: NutritionEstimateSchema,
  cook_time_minutes: z.number(),
});

const DaySchema = z.object({
  day: z.string(),
  meals: z.array(MealSchema),
  daily_cost: z.number(),
});

const GroceryItemSchema = z.object({
  name: z.string(),
  quantity: z.string(),
  estimated_cost: z.number(),
  store_section: z.string(),
});

const GroceryCategorySchema = z.object({
  category: z.string(),
  items: z.array(GroceryItemSchema),
});

const BudgetSummarySchema = z.object({
  weekly_budget: z.number(),
  total_estimated_cost: z.number(),
  remaining_budget: z.number(),
  cost_per_person_per_day: z.number(),
});

export const MealPlanResponseSchema = z.object({
  family_size: z.number(),
  weekly_budget: z.number(),
  region: z.string(),
  days: z.array(DaySchema).min(7).max(7),
  grocery_list: z.array(GroceryCategorySchema),
  budget_summary: BudgetSummarySchema,
  tips: z.array(z.string()),
});

export const SwapMealResponseSchema = z.object({
  meal: MealSchema,
});

export const RecipeResponseSchema = z.object({
  dish_name: z.string(),
  description: z.string(),
  servings: z.number(),
  prep_time_minutes: z.number(),
  cook_time_minutes: z.number(),
  total_time_minutes: z.number(),
  ingredients: z.array(IngredientSchema),
  steps: z.array(z.object({
    step_number: z.number(),
    instruction: z.string(),
    duration_minutes: z.number().optional(),
    tip: z.string().optional(),
  })),
  tips: z.array(z.string()),
  estimated_cost: z.number(),
});

export const FeasibilityResponseSchema = z.object({
  feasible: z.boolean(),
  level: z.enum(["unrealistic", "tight", "moderate", "comfortable"]),
  budget_per_person_per_meal: z.number(),
  message: z.string(),
  suggestions: z.array(z.string()),
});
