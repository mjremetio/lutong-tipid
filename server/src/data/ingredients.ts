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
  { name: "Pancit Canton Noodles", unit: "pack (200g)", price_per_unit: 35, category: "Rice & Grains", aliases: ["pancit", "noodles"] },
  { name: "Misua", unit: "pack (200g)", price_per_unit: 30, category: "Rice & Grains" },

  // Meat & Seafood
  { name: "Chicken", unit: "kg", price_per_unit: 180, category: "Meat & Seafood", aliases: ["manok", "chicken thigh", "chicken leg", "chicken breast"] },
  { name: "Pork Belly (Liempo)", unit: "kg", price_per_unit: 280, category: "Meat & Seafood", aliases: ["liempo", "pork belly"] },
  { name: "Ground Pork", unit: "kg", price_per_unit: 220, category: "Meat & Seafood", aliases: ["giniling"] },
  { name: "Pork Shoulder (Kasim)", unit: "kg", price_per_unit: 240, category: "Meat & Seafood", aliases: ["kasim", "pork kasim"] },
  { name: "Galunggong", unit: "kg", price_per_unit: 150, category: "Meat & Seafood", aliases: ["round scad"] },
  { name: "Tilapia", unit: "kg", price_per_unit: 130, category: "Meat & Seafood" },
  { name: "Bangus", unit: "kg", price_per_unit: 180, category: "Meat & Seafood", aliases: ["milkfish"] },
  { name: "Tuyo", unit: "pack", price_per_unit: 40, category: "Meat & Seafood", aliases: ["dried fish"] },
  { name: "Squid", unit: "kg", price_per_unit: 200, category: "Meat & Seafood", aliases: ["pusit"] },
  { name: "Pork Hock", unit: "kg", price_per_unit: 200, category: "Meat & Seafood", aliases: ["pata"] },
  { name: "Beef", unit: "kg", price_per_unit: 320, category: "Meat & Seafood", aliases: ["baka"] },

  // Vegetables
  { name: "Kangkong", unit: "bundle", price_per_unit: 15, category: "Vegetables", aliases: ["water spinach"] },
  { name: "Talong", unit: "kg", price_per_unit: 60, category: "Vegetables", aliases: ["eggplant"] },
  { name: "Kamatis", unit: "kg", price_per_unit: 60, category: "Vegetables", aliases: ["tomato", "tomatoes"] },
  { name: "Sibuyas", unit: "kg", price_per_unit: 80, category: "Vegetables", aliases: ["onion", "onions"] },
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
  { name: "Sili", unit: "pack", price_per_unit: 10, category: "Vegetables", aliases: ["chili", "chili pepper"] },

  // Eggs & Dairy
  { name: "Egg", unit: "piece", price_per_unit: 8, category: "Eggs & Dairy", aliases: ["itlog", "eggs"] },
  { name: "Tofu", unit: "block (250g)", price_per_unit: 25, category: "Eggs & Dairy", aliases: ["tokwa"] },
  { name: "Cheese", unit: "pack (200g)", price_per_unit: 50, category: "Eggs & Dairy", aliases: ["kesong puti", "eden cheese"] },

  // Canned & Dried Goods
  { name: "Monggo", unit: "pack (250g)", price_per_unit: 30, category: "Canned & Dried", aliases: ["mung beans"] },
  { name: "Sardinas", unit: "can (155g)", price_per_unit: 20, category: "Canned & Dried", aliases: ["sardines"] },
  { name: "Corned Beef", unit: "can (150g)", price_per_unit: 40, category: "Canned & Dried" },
  { name: "Instant Noodles", unit: "pack", price_per_unit: 10, category: "Canned & Dried", aliases: ["lucky me", "nissin"] },
  { name: "Tomato Sauce", unit: "pack (200g)", price_per_unit: 18, category: "Canned & Dried" },
  { name: "Coconut Milk", unit: "can (400ml)", price_per_unit: 45, category: "Canned & Dried", aliases: ["gata"] },

  // Condiments
  { name: "Toyo", unit: "bottle (350ml)", price_per_unit: 25, category: "Condiments", aliases: ["soy sauce"] },
  { name: "Suka", unit: "bottle (350ml)", price_per_unit: 20, category: "Condiments", aliases: ["vinegar"] },
  { name: "Patis", unit: "bottle (350ml)", price_per_unit: 25, category: "Condiments", aliases: ["fish sauce"] },
  { name: "Sampalok Mix", unit: "pack (50g)", price_per_unit: 12, category: "Condiments", aliases: ["tamarind mix", "sinigang mix"] },
  { name: "Bagoong", unit: "bottle (250g)", price_per_unit: 35, category: "Condiments", aliases: ["shrimp paste"] },
  { name: "Oyster Sauce", unit: "bottle (250ml)", price_per_unit: 40, category: "Condiments" },
  { name: "Calamansi", unit: "pack (10pcs)", price_per_unit: 10, category: "Condiments", aliases: ["calamansi", "lemonsito"] },

  // Essentials
  { name: "Cooking Oil", unit: "bottle (1L)", price_per_unit: 70, category: "Essentials", aliases: ["oil", "vegetable oil"] },
  { name: "Salt", unit: "pack (250g)", price_per_unit: 10, category: "Essentials", aliases: ["asin"] },
  { name: "Pepper", unit: "pack (25g)", price_per_unit: 15, category: "Essentials", aliases: ["paminta", "black pepper"] },
  { name: "Sugar", unit: "kg", price_per_unit: 55, category: "Essentials", aliases: ["asukal"] },
  { name: "Flour", unit: "kg", price_per_unit: 45, category: "Essentials", aliases: ["all-purpose flour"] },
];

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
