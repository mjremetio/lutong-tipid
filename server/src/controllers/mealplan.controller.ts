import { Request, Response, NextFunction } from "express";
import { generateMealPlan, swapMeal } from "../services/mealplan.service.js";
import { validateBudgetFeasibility } from "../services/validation.service.js";
import type { GenerateRequest, SwapRequest } from "../types/index.js";

export async function handleValidate(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { weekly_budget, family_size, meals_per_day } = req.body as GenerateRequest;

    const feasibility = validateBudgetFeasibility({
      weekly_budget,
      family_size,
      meals_per_day,
    });

    res.json(feasibility);
  } catch (error) {
    next(error);
  }
}

export async function handleGenerate(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const params = req.body as GenerateRequest;

    // Check feasibility first
    const feasibility = validateBudgetFeasibility({
      weekly_budget: params.weekly_budget,
      family_size: params.family_size,
      meals_per_day: params.meals_per_day,
    });

    if (!feasibility.feasible) {
      res.status(400).json({
        error: "Budget Too Low",
        message: feasibility.message,
        feasibility,
      });
      return;
    }

    const plan = await generateMealPlan(params);

    res.json(plan);
  } catch (error) {
    next(error);
  }
}

export async function handleSwap(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const params = req.body as SwapRequest;
    const newMeal = await swapMeal(params);

    res.json({ meal: newMeal });
  } catch (error) {
    next(error);
  }
}
