export interface Ingredient {
  name: string;
  quantity: string;
  estimated_cost: number;
}

export interface NutritionEstimate {
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
}

export interface Meal {
  meal_type: string;
  dish_name: string;
  description: string;
  ingredients: Ingredient[];
  estimated_cost: number;
  nutrition_estimate: NutritionEstimate;
  cook_time_minutes: number;
}

export interface Day {
  day: string;
  meals: Meal[];
  daily_cost: number;
}

export interface GroceryItem {
  name: string;
  quantity: string;
  estimated_cost: number;
  store_section: string;
}

export interface GroceryCategory {
  category: string;
  items: GroceryItem[];
}

export interface BudgetSummary {
  weekly_budget: number;
  total_estimated_cost: number;
  remaining_budget: number;
  cost_per_person_per_day: number;
}

export interface MealPlanResponse {
  plan_id?: string;
  family_size: number;
  weekly_budget: number;
  region: string;
  days: Day[];
  grocery_list: GroceryCategory[];
  budget_summary: BudgetSummary;
  tips: string[];
}

export interface FeasibilityResponse {
  feasible: boolean;
  level: 'unrealistic' | 'tight' | 'moderate' | 'comfortable';
  budget_per_person_per_meal: number;
  message: string;
  suggestions: string[];
}

export interface GenerateRequest {
  weekly_budget: number;
  family_size: number;
  meals_per_day: string[];
  dietary_restrictions?: string[];
  region?: string;
}

export interface SwapRequest {
  plan_data: MealPlanResponse;
  day: string;
  meal_type: string;
  reason?: string;
}

export interface RecipeStep {
  step_number: number;
  instruction: string;
  duration_minutes?: number;
  tip?: string;
}

export interface RecipeResponse {
  dish_name: string;
  description: string;
  servings: number;
  prep_time_minutes: number;
  cook_time_minutes: number;
  total_time_minutes: number;
  ingredients: Ingredient[];
  steps: RecipeStep[];
  tips: string[];
  estimated_cost: number;
}
