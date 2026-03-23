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
    message = `Sa PHP ${budgetPerPersonPerMeal.toFixed(2)} per tao per kain, napakahirap gumawa ng nutritious meal plan. Kailangan ng mas malaking budget, mare.`;
    suggestions.push(
      "Dagdagan ang weekly budget kung kaya.",
      "Bawasan ang meals per day — pwedeng skip muna ang merienda.",
      "Focus sa pinakamurang ulam: Lugaw, Ginisang Monggo, Tortang Talong, Tuyo at Kamatis.",
      "Bumili ng gulay sa palengke, mas mura kaysa supermarket."
    );
  } else if (budgetPerPersonPerMeal < 25) {
    level = "tight";
    feasible = true;
    message = `Sa PHP ${budgetPerPersonPerMeal.toFixed(2)} per tao per kain, kaya naman pero kailangan ng maingat na pagpili ng ingredients.`;
    suggestions.push(
      "Unahin ang egg dishes at monggo para sa murang protein — Tortang Talong, Ginisang Monggo, Sardinas Guisado.",
      "Bumili ng gulay sa wet market, mas mura ng 20-30% kaysa grocery.",
      "Gamitin ang Tuyo, Tinapa, at Dilis bilang araw-araw na ulam.",
      "Magluto ng marami para sa buong araw — mas tipid sa gas at oras.",
      "Iwasan ang processed food kung may fresh alternative — mas mura ang sariwang gulay."
    );
  } else if (budgetPerPersonPerMeal < 50) {
    level = "moderate";
    feasible = true;
    message = `Sa PHP ${budgetPerPersonPerMeal.toFixed(2)} per tao per kain, okay ang budget! May room para sa variety ng ulam.`;
    suggestions.push(
      "Pwede mag-include ng Adobong Manok, Sinigang na Baboy, Tinolang Manok 2-3x a week.",
      "I-mix ang murang ulam (Monggo, Sardinas) sa mas masarap (Pancit, Afritada) para balanced.",
      "Bumili ng bulk sa palengke — bigas, bawang, sibuyas mas tipid kapag marami.",
      "Lagyan ng prutas bilang merienda o dessert — saging, papaya, watermelon."
    );
  } else {
    level = "comfortable";
    feasible = true;
    message = `Sa PHP ${budgetPerPersonPerMeal.toFixed(2)} per tao per kain, maluwag ang budget! Pwede mag-enjoy ng masasarap na ulam.`;
    suggestions.push(
      "Pwede mag-include ng isda at karne sa halos lahat ng meals — Bistek, Kare-Kare, Lechon Kawali.",
      "May room para sa specialty dishes tulad ng Crispy Pata, Inihaw na Liempo.",
      "I-save ang natitira para sa emergency fund o extra groceries.",
      "Mag-include ng mas maraming nutritious options — fresh fish, lean meat, maraming gulay."
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
