import Groq from "groq-sdk";
import { env } from "../../config/env.js";

const PLACEHOLDER_VALUES = [
  "your-api-key-here",
  "your_api_key_here",
  "groq_api_key",
  "xxx",
  "placeholder",
  "changeme",
  "your-groq-api-key",
  "your_groq_api_key_here",
];

let _groq: Groq | null = null;

function getGroqClient(): Groq {
  if (_groq) return _groq;

  if (
    !env.GROQ_API_KEY ||
    PLACEHOLDER_VALUES.includes(env.GROQ_API_KEY.toLowerCase())
  ) {
    throw new Error(
      "GROQ_API_KEY is missing or set to a placeholder value. Please set a valid API key in your environment."
    );
  }

  _groq = new Groq({ apiKey: env.GROQ_API_KEY });
  return _groq;
}

interface CompletionOptions {
  temperature?: number;
  maxTokens?: number;
}

function isRateLimitError(error: unknown): boolean {
  if (error && typeof error === "object") {
    const err = error as Record<string, unknown>;
    if (err.status === 429 || err.statusCode === 429) return true;
    if (typeof err.message === "string" && /rate.limit/i.test(err.message))
      return true;
  }
  return false;
}

export async function generateChatCompletion(
  systemPrompt: string,
  userMessage: string,
  options: CompletionOptions = {}
): Promise<string> {
  const groq = getGroqClient();
  const { temperature = 0.7, maxTokens = 4096 } = options;

  const models = [env.GROQ_MODEL, env.GROQ_FALLBACK_MODEL].filter(
    (m, i, arr) => m && arr.indexOf(m) === i
  );

  let lastError: unknown = null;

  for (const model of models) {
    try {
      console.log(`Trying model: ${model}`);
      const response = await groq.chat.completions.create({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
        response_format: { type: "json_object" },
        temperature,
        max_tokens: maxTokens,
      });

      const content = response.choices[0]?.message?.content;

      if (!content) {
        throw new Error("No response content received from Groq");
      }

      return stripMarkdownFences(content);
    } catch (error) {
      lastError = error;
      console.warn(
        `Model ${model} failed: ${error instanceof Error ? error.message : String(error)}`
      );

      // Only fallback on rate limit errors; other errors should propagate
      if (!isRateLimitError(error) || models.indexOf(model) === models.length - 1) {
        throw error;
      }

      console.log(`Rate limited on ${model}, falling back to next model...`);
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
