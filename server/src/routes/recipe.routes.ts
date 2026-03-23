import { Router } from "express";
import { handleGetRecipe } from "../controllers/recipe.controller.js";
import { recipeLimiter } from "../middleware/rateLimiter.js";

const router = Router();

router.get("/:dishName", recipeLimiter, handleGetRecipe);

export default router;
