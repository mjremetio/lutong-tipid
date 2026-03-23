import { Request, Response, NextFunction } from "express";
import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { mealPlans } from "../db/schema.js";
import { getGroceryList } from "../services/grocery.service.js";
import type { MealPlanResponse } from "../types/index.js";

export async function handleGetGroceryList(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const planId = req.params.planId as string;

    if (!planId) {
      res.status(400).json({ error: "Missing plan ID" });
      return;
    }

    const [plan] = await db
      .select()
      .from(mealPlans)
      .where(eq(mealPlans.id, planId as string))
      .limit(1);

    if (!plan) {
      res.status(404).json({ error: "Meal plan not found" });
      return;
    }

    const planData = plan.plan_data as MealPlanResponse;
    const groceryList = getGroceryList(planData);

    res.json({ grocery_list: groceryList });
  } catch (error) {
    next(error);
  }
}
