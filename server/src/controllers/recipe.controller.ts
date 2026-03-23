import { Request, Response, NextFunction } from "express";
import { generateChatCompletion } from "../services/ai/groq.service.js";
import { SYSTEM_004_RECIPE } from "../services/ai/prompts.js";
import { RecipeResponseSchema } from "../services/ai/schemas.js";
import { withRetry } from "../services/ai/retry.js";
import type { RecipeResponse } from "../types/index.js";

export async function handleGetRecipe(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const dishName = req.params.dishName as string;

    if (!dishName) {
      res.status(400).json({ error: "Missing dish name" });
      return;
    }

    const decodedDishName = decodeURIComponent(dishName);
    const familySize = parseInt(String(req.query.family_size ?? "4"), 10) || 4;
    const ingredientsParam = req.query.ingredients;
    const ingredients = typeof ingredientsParam === "string"
      ? ingredientsParam.split(",").map((i) => i.trim())
      : [];

    const { system, user } = SYSTEM_004_RECIPE({
      dish_name: decodedDishName,
      family_size: familySize,
      ingredients,
    });

    const recipe: RecipeResponse = await withRetry(
      () => generateChatCompletion(system, user, { temperature: 0.6, maxTokens: 4096 }),
      (data) => RecipeResponseSchema.parse(data),
      2
    );

    res.json(recipe);
  } catch (error) {
    next(error);
  }
}
