export interface IngredientPrice {
  name: string;
  unit: string;
  price_per_unit: number;
  category: string;
  aliases?: string[];
}

export const INGREDIENT_PRICES: IngredientPrice[] = [
  // Rice & Grains
  { name: "Rice", unit: "kg", price_per_unit: 45, category: "Rice & Grains", aliases: ["bigas", "kanin", "sinangag"] },
  { name: "Glutinous Rice", unit: "kg", price_per_unit: 60, category: "Rice & Grains", aliases: ["malagkit"] },
  { name: "Cornick", unit: "pack", price_per_unit: 25, category: "Rice & Grains" },
  { name: "Pancit Canton Noodles", unit: "pack (200g)", price_per_unit: 35, category: "Rice & Grains", aliases: ["pancit", "noodles", "pancit canton"] },
  { name: "Pancit Bihon Noodles", unit: "pack (200g)", price_per_unit: 30, category: "Rice & Grains", aliases: ["bihon", "rice noodles"] },
  { name: "Misua", unit: "pack (200g)", price_per_unit: 30, category: "Rice & Grains" },
  { name: "Sotanghon", unit: "pack (100g)", price_per_unit: 25, category: "Rice & Grains", aliases: ["glass noodles", "cellophane noodles"] },
  { name: "Pandesal", unit: "10 pcs", price_per_unit: 30, category: "Rice & Grains", aliases: ["bread"] },
  { name: "Champorado Mix", unit: "pack", price_per_unit: 25, category: "Rice & Grains", aliases: ["tablea", "cocoa tablea"] },

  // Meat & Seafood
  { name: "Chicken", unit: "kg", price_per_unit: 180, category: "Meat & Seafood", aliases: ["manok", "chicken thigh", "chicken leg", "chicken breast", "chicken wings"] },
  { name: "Pork Belly (Liempo)", unit: "kg", price_per_unit: 280, category: "Meat & Seafood", aliases: ["liempo", "pork belly"] },
  { name: "Ground Pork", unit: "kg", price_per_unit: 220, category: "Meat & Seafood", aliases: ["giniling", "ground meat"] },
  { name: "Pork Shoulder (Kasim)", unit: "kg", price_per_unit: 240, category: "Meat & Seafood", aliases: ["kasim", "pork kasim", "pork"] },
  { name: "Galunggong", unit: "kg", price_per_unit: 150, category: "Meat & Seafood", aliases: ["round scad"] },
  { name: "Tilapia", unit: "kg", price_per_unit: 130, category: "Meat & Seafood" },
  { name: "Bangus", unit: "kg", price_per_unit: 180, category: "Meat & Seafood", aliases: ["milkfish", "daing na bangus"] },
  { name: "Tuyo", unit: "pack", price_per_unit: 40, category: "Meat & Seafood", aliases: ["dried fish", "tinapa"] },
  { name: "Squid", unit: "kg", price_per_unit: 200, category: "Meat & Seafood", aliases: ["pusit"] },
  { name: "Pork Hock", unit: "kg", price_per_unit: 200, category: "Meat & Seafood", aliases: ["pata"] },
  { name: "Beef", unit: "kg", price_per_unit: 320, category: "Meat & Seafood", aliases: ["baka", "beef brisket"] },
  { name: "Hipon", unit: "kg", price_per_unit: 250, category: "Meat & Seafood", aliases: ["shrimp", "sugpo"] },
  { name: "Hotdog", unit: "pack (10pcs)", price_per_unit: 65, category: "Meat & Seafood", aliases: ["hot dog"] },
  { name: "Longganisa", unit: "pack (10pcs)", price_per_unit: 80, category: "Meat & Seafood", aliases: ["longaniza"] },
  { name: "Tocino", unit: "pack (250g)", price_per_unit: 75, category: "Meat & Seafood" },
  { name: "Tapa", unit: "pack (250g)", price_per_unit: 90, category: "Meat & Seafood" },
  { name: "Dilis", unit: "pack (100g)", price_per_unit: 30, category: "Meat & Seafood", aliases: ["anchovies", "dried dilis"] },
  { name: "Alamang", unit: "pack (100g)", price_per_unit: 25, category: "Meat & Seafood", aliases: ["tiny shrimp"] },

  // Vegetables
  { name: "Kangkong", unit: "bundle", price_per_unit: 15, category: "Vegetables", aliases: ["water spinach"] },
  { name: "Talong", unit: "kg", price_per_unit: 60, category: "Vegetables", aliases: ["eggplant"] },
  { name: "Kamatis", unit: "kg", price_per_unit: 60, category: "Vegetables", aliases: ["tomato", "tomatoes"] },
  { name: "Sibuyas", unit: "kg", price_per_unit: 80, category: "Vegetables", aliases: ["onion", "onions", "sibuyas bombay"] },
  { name: "Bawang", unit: "kg", price_per_unit: 120, category: "Vegetables", aliases: ["garlic"] },
  { name: "Sitaw", unit: "bundle", price_per_unit: 20, category: "Vegetables", aliases: ["string beans", "long beans"] },
  { name: "Pechay", unit: "bundle", price_per_unit: 15, category: "Vegetables", aliases: ["bok choy"] },
  { name: "Repolyo", unit: "piece", price_per_unit: 40, category: "Vegetables", aliases: ["cabbage"] },
  { name: "Kalabasa", unit: "kg", price_per_unit: 40, category: "Vegetables", aliases: ["squash"] },
  { name: "Labanos", unit: "piece", price_per_unit: 15, category: "Vegetables", aliases: ["radish"] },
  { name: "Habitchuelas", unit: "kg", price_per_unit: 80, category: "Vegetables", aliases: ["green beans"] },
  { name: "Ampalaya", unit: "kg", price_per_unit: 80, category: "Vegetables", aliases: ["bitter gourd", "bitter melon"] },
  { name: "Gabi", unit: "kg", price_per_unit: 50, category: "Vegetables", aliases: ["taro"] },
  { name: "Sayote", unit: "piece", price_per_unit: 20, category: "Vegetables", aliases: ["chayote"] },
  { name: "Luya", unit: "kg", price_per_unit: 100, category: "Vegetables", aliases: ["ginger"] },
  { name: "Sili", unit: "pack", price_per_unit: 10, category: "Vegetables", aliases: ["chili", "chili pepper", "siling labuyo", "siling haba"] },
  { name: "Dahon ng Sili", unit: "bundle", price_per_unit: 10, category: "Vegetables", aliases: ["pepper leaves"] },
  { name: "Malunggay", unit: "bundle", price_per_unit: 10, category: "Vegetables", aliases: ["moringa", "dahon ng malunggay"] },
  { name: "Patola", unit: "piece", price_per_unit: 25, category: "Vegetables", aliases: ["sponge gourd", "luffa"] },
  { name: "Mais", unit: "piece", price_per_unit: 15, category: "Vegetables", aliases: ["corn", "sweet corn"] },
  { name: "Kamote", unit: "kg", price_per_unit: 35, category: "Vegetables", aliases: ["sweet potato"] },
  { name: "Saging na Saba", unit: "bundle (6pcs)", price_per_unit: 30, category: "Vegetables", aliases: ["cooking banana", "saba banana"] },
  { name: "Papaya (Green)", unit: "kg", price_per_unit: 40, category: "Vegetables", aliases: ["green papaya"] },

  // Eggs & Dairy
  { name: "Egg", unit: "piece", price_per_unit: 8, category: "Eggs & Dairy", aliases: ["itlog", "eggs"] },
  { name: "Tofu", unit: "block (250g)", price_per_unit: 25, category: "Eggs & Dairy", aliases: ["tokwa"] },
  { name: "Cheese", unit: "pack (200g)", price_per_unit: 50, category: "Eggs & Dairy", aliases: ["kesong puti", "eden cheese"] },
  { name: "Evaporated Milk", unit: "can (370ml)", price_per_unit: 35, category: "Eggs & Dairy", aliases: ["evap", "alaska evap"] },

  // Canned & Dried Goods
  { name: "Monggo", unit: "pack (250g)", price_per_unit: 30, category: "Canned & Dried", aliases: ["mung beans", "munggo"] },
  { name: "Sardinas", unit: "can (155g)", price_per_unit: 20, category: "Canned & Dried", aliases: ["sardines", "ligo", "mega sardines"] },
  { name: "Corned Beef", unit: "can (150g)", price_per_unit: 40, category: "Canned & Dried" },
  { name: "Instant Noodles", unit: "pack", price_per_unit: 10, category: "Canned & Dried", aliases: ["lucky me", "nissin"] },
  { name: "Tomato Sauce", unit: "pack (200g)", price_per_unit: 18, category: "Canned & Dried" },
  { name: "Coconut Milk", unit: "can (400ml)", price_per_unit: 45, category: "Canned & Dried", aliases: ["gata", "coconut cream"] },
  { name: "Liver Spread", unit: "can (85g)", price_per_unit: 20, category: "Canned & Dried", aliases: ["reno liver spread"] },
  { name: "Tomato Paste", unit: "pack (70g)", price_per_unit: 12, category: "Canned & Dried" },
  { name: "Dried Dilis", unit: "pack (100g)", price_per_unit: 30, category: "Canned & Dried", aliases: ["dried anchovies"] },

  // Condiments
  { name: "Toyo", unit: "bottle (350ml)", price_per_unit: 25, category: "Condiments", aliases: ["soy sauce", "silver swan"] },
  { name: "Suka", unit: "bottle (350ml)", price_per_unit: 20, category: "Condiments", aliases: ["vinegar", "datu puti"] },
  { name: "Patis", unit: "bottle (350ml)", price_per_unit: 25, category: "Condiments", aliases: ["fish sauce"] },
  { name: "Sampalok Mix", unit: "pack (50g)", price_per_unit: 12, category: "Condiments", aliases: ["tamarind mix", "sinigang mix", "knorr sinigang"] },
  { name: "Bagoong", unit: "bottle (250g)", price_per_unit: 35, category: "Condiments", aliases: ["shrimp paste", "bagoong alamang"] },
  { name: "Oyster Sauce", unit: "bottle (250ml)", price_per_unit: 40, category: "Condiments" },
  { name: "Calamansi", unit: "pack (10pcs)", price_per_unit: 10, category: "Condiments", aliases: ["calamansi", "lemonsito"] },
  { name: "Achuete", unit: "pack (50g)", price_per_unit: 10, category: "Condiments", aliases: ["annatto", "atsuete"] },
  { name: "Laurel", unit: "pack", price_per_unit: 10, category: "Condiments", aliases: ["bay leaves", "bay leaf"] },
  { name: "Whole Peppercorn", unit: "pack (50g)", price_per_unit: 15, category: "Condiments", aliases: ["pamintang buo"] },

  // Essentials
  { name: "Cooking Oil", unit: "bottle (1L)", price_per_unit: 70, category: "Essentials", aliases: ["oil", "vegetable oil", "mantika"] },
  { name: "Salt", unit: "pack (250g)", price_per_unit: 10, category: "Essentials", aliases: ["asin"] },
  { name: "Pepper", unit: "pack (25g)", price_per_unit: 15, category: "Essentials", aliases: ["paminta", "black pepper"] },
  { name: "Sugar", unit: "kg", price_per_unit: 55, category: "Essentials", aliases: ["asukal"] },
  { name: "Flour", unit: "kg", price_per_unit: 45, category: "Essentials", aliases: ["all-purpose flour", "harina"] },
  { name: "Cornstarch", unit: "pack (100g)", price_per_unit: 12, category: "Essentials", aliases: ["gawgaw"] },
  { name: "Butter", unit: "pack (100g)", price_per_unit: 35, category: "Essentials", aliases: ["margarine", "star margarine"] },
];

/**
 * Find a matching ingredient from our price database.
 * Matches by name or aliases (case-insensitive, partial match).
 */
export function findIngredientPrice(name: string): IngredientPrice | null {
  const lower = name.toLowerCase().trim();

  // Exact match first
  for (const item of INGREDIENT_PRICES) {
    if (item.name.toLowerCase() === lower) return item;
    if (item.aliases?.some((a) => a.toLowerCase() === lower)) return item;
  }

  // Partial match (ingredient name contains or is contained in search)
  for (const item of INGREDIENT_PRICES) {
    const itemLower = item.name.toLowerCase();
    if (lower.includes(itemLower) || itemLower.includes(lower)) return item;
    if (item.aliases?.some((a) => {
      const aLower = a.toLowerCase();
      return lower.includes(aLower) || aLower.includes(lower);
    })) return item;
  }

  return null;
}

/**
 * Estimate a reasonable cost for an ingredient based on our price table.
 * Uses the quantity string and family size to calculate.
 * For a typical Filipino family meal, most ingredients cost PHP 10-80 each.
 */
export function estimateIngredientCost(
  name: string,
  quantity: string,
  familySize: number
): number | null {
  const item = findIngredientPrice(name);
  if (!item) return null;

  const qty = quantity.toLowerCase().trim();
  const ppu = item.price_per_unit;

  // Extract the leading number from quantity (e.g., "2 cups" → 2, "500g" → 500, "1/2 kg" → 0.5)
  let amount = 1;
  const fracMatch = qty.match(/^(\d+)\/(\d+)/);
  const numMatch = qty.match(/^([\d.]+)/);
  if (fracMatch) {
    amount = parseInt(fracMatch[1], 10) / parseInt(fracMatch[2], 10);
  } else if (numMatch) {
    amount = parseFloat(numMatch[1]) || 1;
  }

  // For kg-priced items, handle gram/kg conversions
  if (item.unit.includes("kg")) {
    // "500g" or "500 g" → grams (but NOT "500kg")
    if (/\d\s*g\b/.test(qty) && !qty.includes("kg")) {
      const grams = amount; // the leading number IS grams
      return r(grams / 1000 * ppu);
    }
    // "1.5 kg" or "1 kg"
    if (qty.includes("kg")) {
      return r(amount * ppu);
    }
    // "2 cups rice" → roughly 400g per cup, estimate fraction of kg
    if (qty.includes("cup")) {
      return r(amount * 0.2 * ppu); // ~200g per cup
    }
    // No unit specified — assume a typical portion for this family size
    // For meat/fish: ~250g per person, for veggies: ~100g per person
    const isProtein = item.category === "Meat & Seafood";
    const portionKg = isProtein ? 0.25 : 0.15;
    // If amount > 5, it's probably grams not units
    if (amount > 5) {
      return r(amount / 1000 * ppu);
    }
    return r(amount * ppu);
  }

  // For piece-priced items (eggs, sayote, etc.)
  if (item.unit.includes("piece") || item.unit.includes("pcs")) {
    return r(amount * ppu);
  }

  // For bundle/pack/can/bottle items — amount × price
  return r(amount * ppu);
}

function r(n: number): number {
  return Math.round(n * 100) / 100;
}

export function getIngredientPriceTable(): string {
  const header = "INGREDIENT PRICE REFERENCE (Philippine Pesos):\n";
  const separator = "-".repeat(60) + "\n";

  let table = header + separator;
  table += `${"Ingredient".padEnd(30)} ${"Unit".padEnd(15)} Price\n`;
  table += separator;

  let currentCategory = "";

  for (const item of INGREDIENT_PRICES) {
    if (item.category !== currentCategory) {
      currentCategory = item.category;
      table += `\n[${currentCategory}]\n`;
    }
    table += `${item.name.padEnd(30)} ${item.unit.padEnd(15)} PHP ${item.price_per_unit}\n`;
  }

  table += separator;
  table += "Note: Prices are approximate NCR wet market prices. Adjust for regional variation.\n";

  return table;
}
