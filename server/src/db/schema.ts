import { pgTable, uuid, text, integer, real, jsonb, timestamp } from "drizzle-orm/pg-core";

export const mealPlans = pgTable("meal_plans", {
  id: uuid("id").primaryKey().defaultRandom(),
  weekly_budget: integer("weekly_budget").notNull(),
  family_size: integer("family_size").notNull(),
  meals_per_day: jsonb("meals_per_day").notNull(),
  dietary_restrictions: jsonb("dietary_restrictions"),
  region: text("region").default("NCR"),
  total_cost: real("total_cost"),
  plan_data: jsonb("plan_data").notNull(),
  created_at: timestamp("created_at").defaultNow(),
});

export const feedback = pgTable("feedback", {
  id: uuid("id").primaryKey().defaultRandom(),
  plan_id: uuid("plan_id").references(() => mealPlans.id),
  rating: integer("rating"),
  comment: text("comment"),
  created_at: timestamp("created_at").defaultNow(),
});
