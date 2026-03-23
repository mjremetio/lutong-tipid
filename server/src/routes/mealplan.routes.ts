import { Router } from "express";
import { handleValidate, handleGenerate, handleSwap } from "../controllers/mealplan.controller.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { generateLimiter, swapLimiter } from "../middleware/rateLimiter.js";
import { GenerateRequestSchema, SwapRequestSchema } from "../services/ai/schemas.js";

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
