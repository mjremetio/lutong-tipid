import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "../../config/env.js";

const PLACEHOLDER_VALUES = [
  "your-api-key-here",
  "your_api_key_here",
  "xxx",
  "placeholder",
  "changeme",
];

let _genAI: GoogleGenerativeAI | null = null;

function getGeminiClient(): GoogleGenerativeAI {
  if (_genAI) return _genAI;

  if (
    !env.GEMINI_API_KEY ||
    PLACEHOLDER_VALUES.includes(env.GEMINI_API_KEY.toLowerCase())
  ) {
    throw new Error(
      "GEMINI_API_KEY is missing or set to a placeholder value. Please set a valid API key in your environment."
    );
  }

  _genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
  return _genAI;
}

interface CompletionOptions {
  temperature?: number;
  maxTokens?: number;
}

function isRateLimitError(error: unknown): boolean {
  if (error && typeof error === "object") {
    const err = error as Record<string, unknown>;
    if (err.status === 429 || err.statusCode === 429) return true;
    if (typeof err.message === "string" && /rate.limit|quota|resource.*exhausted/i.test(err.message))
      return true;
  }
  return false;
}

export async function generateChatCompletion(
  systemPrompt: string,
  userMessage: string,
  options: CompletionOptions = {}
): Promise<string> {
  const genAI = getGeminiClient();
  const { temperature = 0.7, maxTokens = 8192 } = options;

  const models = [env.GEMINI_MODEL, env.GEMINI_FALLBACK_MODEL].filter(
    (m, i, arr) => m && arr.indexOf(m) === i
  );

  let lastError: unknown = null;

  for (const modelName of models) {
    try {
      console.log(`Trying Gemini model: ${modelName}`);

      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: {
          temperature,
          maxOutputTokens: maxTokens,
          responseMimeType: "application/json",
        },
        systemInstruction: systemPrompt,
      });

      const result = await model.generateContent(userMessage);
      const response = result.response;
      const content = response.text();

      if (!content) {
        throw new Error("No response content received from Gemini");
      }

      return stripMarkdownFences(content);
    } catch (error) {
      lastError = error;
      console.warn(
        `Model ${modelName} failed: ${error instanceof Error ? error.message : String(error)}`
      );

      // Only fallback on rate limit errors; other errors should propagate
      if (!isRateLimitError(error) || models.indexOf(modelName) === models.length - 1) {
        throw error;
      }

      console.log(`Rate limited on ${modelName}, falling back to next model...`);
    }
  }

  throw lastError;
}

function stripMarkdownFences(text: string): string {
  const fenceRegex = /^```(?:json)?\s*\n?([\s\S]*?)\n?\s*```$/;
  const match = text.trim().match(fenceRegex);
  if (match) {
    return match[1].trim();
  }
  return text.trim();
}
