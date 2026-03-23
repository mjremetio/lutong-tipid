import { Router } from "express";
import { handleGetRecipe } from "../controllers/recipe.controller";
import { recipeLimiter } from "../middleware/rateLimiter";

const router = Router();

router.get("/:dishName", recipeLimiter, handleGetRecipe);

export default router;
