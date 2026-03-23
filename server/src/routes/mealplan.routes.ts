import { Router } from "express";
import { handleValidate, handleGenerate, handleSwap } from "../controllers/mealplan.controller";
import { validateRequest } from "../middleware/validateRequest";
import { generateLimiter, swapLimiter } from "../middleware/rateLimiter";
import { GenerateRequestSchema, SwapRequestSchema } from "../services/ai/schemas";

const router = Router();

router.post(
  "/validate",
  validateRequest(GenerateRequestSchema),
  handleValidate
);

router.post(
  "/generate",
  generateLimiter,
  validateRequest(GenerateRequestSchema),
  handleGenerate
);

router.post(
  "/swap",
  swapLimiter,
  validateRequest(SwapRequestSchema),
  handleSwap
);

export default router;
