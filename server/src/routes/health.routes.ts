import { Router } from "express";
import { generateChatCompletion } from "../services/ai/groq.service.js";
import { env } from "../config/env.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    status: "ok",
    service: "Lutong Tipid API",
    timestamp: new Date().toISOString(),
    providers: {
      gemini: env.GEMINI_API_KEY ? "configured" : "not set",
      groq: env.GROQ_API_KEY ? "configured" : "not set",
    },
  });
});

router.get("/ai-test", async (_req, res) => {
  try {
    const result = await generateChatCompletion(
      "You are a helpful assistant. Respond with valid JSON only.",
      'Say hello in JSON format: {"message": "hello", "provider": "name of model you are"}',
      { temperature: 0, maxTokens: 100 }
    );
    res.json({ status: "ok", response: result });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    res.json({ status: "error", message: msg });
  }
});

export default router;
