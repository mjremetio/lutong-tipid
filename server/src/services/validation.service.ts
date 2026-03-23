import type { FeasibilityResponse } from "../types";

interface FeasibilityParams {
  weekly_budget: number;
  family_size: number;
  meals_per_day: string[];
}

export function validateBudgetFeasibility(params: FeasibilityParams): FeasibilityResponse {
  const { weekly_budget, family_size, meals_per_day } = params;

  if (meals_per_day.length === 0 || family_size <= 0 || weekly_budget <= 0) {
    return {
      feasible: false,
      level: "unrealistic",
      budget_per_person_per_meal: 0,
      message: "Invalid input — please provide a valid budget, family size, and at least one meal type.",
      suggestions: ["Set your weekly budget, family size, and choose at least one meal type."],
    };
  }

  const totalMealsPerWeek = meals_per_day.length * 7;
  const budgetPerPersonPerMeal = weekly_budget / (family_size * totalMealsPerWeek);

  let level: FeasibilityResponse["level"];
  let feasible: boolean;
  let message: string;
  const suggestions: string[] = [];

  if (budgetPerPersonPerMeal < 15) {
    level = "unrealistic";
    feasible = false;
    message = `Sa PHP ${budgetPerPersonPerMeal.toFixed(2)} per person per meal, napakahirap gumawa ng nutritious meal plan. Kailangan ng mas malaking budget.`;
    suggestions.push(
      "Increase the weekly budget if possible.",
      "Reduce the number of meals per day (e.g., skip merienda).",
      "Consider reducing family size portions.",
      "Focus on the most affordable staples: rice, monggo, tuyo, kangkong."
    );
  } else if (budgetPerPersonPerMeal < 25) {
    level = "tight";
    feasible = true;
    message = `Sa PHP ${budgetPerPersonPerMeal.toFixed(2)} per person per meal, kaya pero medyo mahirap. Kailangan ng maingat na pagpili ng ingredients.`;
    suggestions.push(
      "Prioritize egg-based and monggo dishes for affordable protein.",
      "Buy vegetables from wet markets for lower prices.",
      "Use tinapa/tuyo as affordable ulam options.",
      "Cook in bulk to reduce per-meal costs.",
      "Avoid processed/canned goods when fresh alternatives are cheaper."
    );
  } else if (budgetPerPersonPerMeal < 50) {
    level = "moderate";
    feasible = true;
    message = `Sa PHP ${budgetPerPersonPerMeal.toFixed(2)} per person per meal, comfortable ang budget. May room para sa variety.`;
    suggestions.push(
      "You can include chicken and pork dishes 2-3 times per week.",
      "Mix affordable and moderate ingredients for variety.",
      "Consider buying in bulk for additional savings.",
      "Include fresh fruits as snacks or desserts."
    );
  } else {
    level = "comfortable";
    feasible = true;
    message = `Sa PHP ${budgetPerPersonPerMeal.toFixed(2)} per person per meal, maluwag ang budget. Pwede mag-include ng mas maraming variety at premium ingredients.`;
    suggestions.push(
      "You can include fish and meat in most meals.",
      "Room for specialty ingredients and varied dishes.",
      "Consider saving the surplus for emergencies.",
      "Great opportunity to include more nutritious options."
    );
  }

  return {
    feasible,
    level,
    budget_per_person_per_meal: Math.round(budgetPerPersonPerMeal * 100) / 100,
    message,
    suggestions,
  };
}
