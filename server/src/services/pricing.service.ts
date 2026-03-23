import { INGREDIENT_PRICES, type IngredientPrice } from "../data/ingredients.js";
import type { Ingredient } from "../types/index.js";

export function lookupPrice(ingredientName: string): IngredientPrice | null {
  const searchName = ingredientName.toLowerCase().trim();

  // Exact match on name
  const exactMatch = INGREDIENT_PRICES.find(
    (p) => p.name.toLowerCase() === searchName
  );
  if (exactMatch) return exactMatch;

  // Check aliases
  const aliasMatch = INGREDIENT_PRICES.find(
    (p) => p.aliases?.some((alias) => alias.toLowerCase() === searchName)
  );
  if (aliasMatch) return aliasMatch;

  // Partial match on name
  const partialMatch = INGREDIENT_PRICES.find(
    (p) => p.name.toLowerCase().includes(searchName) || searchName.includes(p.name.toLowerCase())
  );
  if (partialMatch) return partialMatch;

  // Partial match on aliases
  const partialAliasMatch = INGREDIENT_PRICES.find(
    (p) =>
      p.aliases?.some(
        (alias) =>
          alias.toLowerCase().includes(searchName) || searchName.includes(alias.toLowerCase())
      )
  );
  if (partialAliasMatch) return partialAliasMatch;

  return null;
}

export function estimateMealCost(ingredients: Ingredient[]): number {
  let total = 0;

  for (const ingredient of ingredients) {
    // Use the ingredient's own estimated cost if available
    if (ingredient.estimated_cost > 0) {
      total += ingredient.estimated_cost;
      continue;
    }

    // Otherwise, look up from our price database
    const priceInfo = lookupPrice(ingredient.name);
    if (priceInfo) {
      total += priceInfo.price_per_unit;
    }
  }

  return Math.round(total * 100) / 100;
}
