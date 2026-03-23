import type { MealPlanResponse, GroceryCategory } from "../types";

interface ConsolidatedItem {
  name: string;
  quantities: string[];
  total_cost: number;
  store_section: string;
}

export function getGroceryList(planData: MealPlanResponse): GroceryCategory[] {
  // If the plan already has a grocery list, return it consolidated
  if (planData.grocery_list && planData.grocery_list.length > 0) {
    return consolidateGroceryList(planData.grocery_list);
  }

  // Otherwise, extract from meal data
  return extractGroceryFromMeals(planData);
}

function consolidateGroceryList(groceryList: GroceryCategory[]): GroceryCategory[] {
  const consolidated = new Map<string, Map<string, ConsolidatedItem>>();

  for (const category of groceryList) {
    if (!consolidated.has(category.category)) {
      consolidated.set(category.category, new Map());
    }
    const categoryMap = consolidated.get(category.category)!;

    for (const item of category.items) {
      const key = item.name.toLowerCase().trim();
      if (categoryMap.has(key)) {
        const existing = categoryMap.get(key)!;
        existing.quantities.push(item.quantity);
        existing.total_cost += item.estimated_cost;
      } else {
        categoryMap.set(key, {
          name: item.name,
          quantities: [item.quantity],
          total_cost: item.estimated_cost,
          store_section: item.store_section,
        });
      }
    }
  }

  const result: GroceryCategory[] = [];
  for (const [category, items] of consolidated) {
    result.push({
      category,
      items: Array.from(items.values()).map((item) => ({
        name: item.name,
        quantity: mergeQuantities(item.quantities),
        estimated_cost: Math.round(item.total_cost * 100) / 100,
        store_section: item.store_section,
      })),
    });
  }

  return result;
}

function extractGroceryFromMeals(planData: MealPlanResponse): GroceryCategory[] {
  const itemMap = new Map<string, ConsolidatedItem>();

  for (const day of planData.days) {
    for (const meal of day.meals) {
      for (const ingredient of meal.ingredients) {
        const key = ingredient.name.toLowerCase().trim();
        if (itemMap.has(key)) {
          const existing = itemMap.get(key)!;
          existing.quantities.push(ingredient.quantity);
          existing.total_cost += ingredient.estimated_cost;
        } else {
          itemMap.set(key, {
            name: ingredient.name,
            quantities: [ingredient.quantity],
            total_cost: ingredient.estimated_cost,
            store_section: categorizeIngredient(ingredient.name),
          });
        }
      }
    }
  }

  // Group by store section
  const sectionMap = new Map<string, ConsolidatedItem[]>();
  for (const item of itemMap.values()) {
    const section = item.store_section;
    if (!sectionMap.has(section)) {
      sectionMap.set(section, []);
    }
    sectionMap.get(section)!.push(item);
  }

  return Array.from(sectionMap.entries()).map(([category, items]) => ({
    category,
    items: items.map((item) => ({
      name: item.name,
      quantity: mergeQuantities(item.quantities),
      estimated_cost: Math.round(item.total_cost * 100) / 100,
      store_section: item.store_section,
    })),
  }));
}

function mergeQuantities(quantities: string[]): string {
  if (quantities.length === 1) return quantities[0];
  return quantities.join(" + ");
}

function categorizeIngredient(name: string): string {
  const lower = name.toLowerCase();
  const meatKeywords = ["chicken", "pork", "beef", "manok", "baboy", "baka", "liempo", "kasim", "ground"];
  const seafoodKeywords = ["fish", "galunggong", "tilapia", "bangus", "tuyo", "squid", "pusit", "shrimp", "hipon"];
  const veggieKeywords = ["kangkong", "talong", "kamatis", "sibuyas", "bawang", "sitaw", "pechay", "repolyo", "kalabasa", "labanos", "ampalaya", "gabi", "sayote", "luya", "sili", "vegetable"];
  const condimentKeywords = ["toyo", "suka", "patis", "bagoong", "sauce", "oil", "salt", "pepper", "sugar", "vinegar", "soy"];

  if (meatKeywords.some((k) => lower.includes(k))) return "Meat";
  if (seafoodKeywords.some((k) => lower.includes(k))) return "Seafood";
  if (veggieKeywords.some((k) => lower.includes(k))) return "Vegetables";
  if (lower.includes("egg") || lower.includes("itlog") || lower.includes("tofu") || lower.includes("tokwa")) return "Eggs & Dairy";
  if (lower.includes("rice") || lower.includes("bigas") || lower.includes("noodle") || lower.includes("pancit")) return "Rice & Grains";
  if (condimentKeywords.some((k) => lower.includes(k))) return "Condiments & Essentials";
  if (lower.includes("can") || lower.includes("sardine") || lower.includes("corned")) return "Canned Goods";

  return "Other";
}
