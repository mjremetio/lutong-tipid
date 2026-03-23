import { Router } from "express";
import { generateChatCompletion } from "../services/ai/groq.service.js";
import { env } from "../config/env.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    status: "ok",
    service: "Lutong Tipid API",
    timestamp: new Date().toISOString(),
  });
});

router.get("/ai-test", async (_req, res) => {
  try {
    const hasKey = !!env.GEMINI_API_KEY && env.GEMINI_API_KEY.length > 5;
    if (!hasKey) {
      res.json({ status: "error", message: "GEMINI_API_KEY not set or too short", keyLength: env.GEMINI_API_KEY?.length ?? 0 });
      return;
    }

    const result = await generateChatCompletion(
      "You are a helpful assistant. Respond with valid JSON only.",
      'Say hello in JSON format: {"message": "hello"}',
      { temperature: 0, maxTokens: 50 }
    );
    res.json({ status: "ok", model: env.GEMINI_MODEL, response: result });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    res.json({ status: "error", message: msg, model: env.GEMINI_MODEL });
  }
});

export default router;
