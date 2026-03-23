import { GoogleGenerativeAI } from "@google/generative-ai";
import Groq from "groq-sdk";
import { env } from "../../config/env.js";

// --- Lazy clients ---
let _genAI: GoogleGenerativeAI | null = null;
let _groq: Groq | null = null;

function getGeminiClient(): GoogleGenerativeAI | null {
  if (_genAI) return _genAI;
  if (!env.GEMINI_API_KEY || env.GEMINI_API_KEY.length < 10) return null;
  _genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
  return _genAI;
}

function getGroqClient(): Groq | null {
  if (_groq) return _groq;
  if (!env.GROQ_API_KEY || env.GROQ_API_KEY.length < 10) return null;
  _groq = new Groq({ apiKey: env.GROQ_API_KEY });
  return _groq;
}

// --- Provider functions ---

async function callGemini(
  systemPrompt: string,
  userMessage: string,
  temperature: number,
  maxTokens: number
): Promise<string> {
  const genAI = getGeminiClient();
  if (!genAI) throw new Error("GEMINI_API_KEY not configured");

  console.log(`Trying Gemini: ${env.GEMINI_MODEL}`);
  const model = genAI.getGenerativeModel({
    model: env.GEMINI_MODEL,
    generationConfig: {
      temperature,
      maxOutputTokens: maxTokens,
      responseMimeType: "application/json",
    },
    systemInstruction: systemPrompt,
  });

  const result = await model.generateContent(userMessage);
  const content = result.response.text();
  if (!content) throw new Error("No response from Gemini");
  return content;
}

async function callGroq(
  systemPrompt: string,
  userMessage: string,
  temperature: number,
  maxTokens: number
): Promise<string> {
  const groq = getGroqClient();
  if (!groq) throw new Error("GROQ_API_KEY not configured");

  console.log(`Trying Groq: ${env.GROQ_MODEL}`);
  const response = await groq.chat.completions.create({
    model: env.GROQ_MODEL,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage },
    ],
    response_format: { type: "json_object" },
    temperature,
    max_tokens: maxTokens,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error("No response from Groq");
  return content;
}

// --- Public API ---

interface CompletionOptions {
  temperature?: number;
  maxTokens?: number;
}

export async function generateChatCompletion(
  systemPrompt: string,
  userMessage: string,
  options: CompletionOptions = {}
): Promise<string> {
  const { temperature = 0.7, maxTokens = 8192 } = options;

  // Build provider list based on available keys
  const providers: Array<{ name: string; fn: () => Promise<string> }> = [];

  if (env.GEMINI_API_KEY && env.GEMINI_API_KEY.length >= 10) {
    providers.push({
      name: "Gemini",
      fn: () => callGemini(systemPrompt, userMessage, temperature, maxTokens),
    });
  }

  if (env.GROQ_API_KEY && env.GROQ_API_KEY.length >= 10) {
    providers.push({
      name: "Groq",
      fn: () => callGroq(systemPrompt, userMessage, temperature, maxTokens),
    });
  }

  if (providers.length === 0) {
    throw new Error(
      "No AI provider configured. Set GEMINI_API_KEY or GROQ_API_KEY in your environment."
    );
  }

  let lastError: unknown = null;

  for (const provider of providers) {
    try {
      const content = await provider.fn();
      return stripMarkdownFences(content);
    } catch (error) {
      lastError = error;
      const msg = error instanceof Error ? error.message : String(error);
      console.warn(`${provider.name} failed: ${msg}`);

      // If there's another provider to try, continue
      if (providers.indexOf(provider) < providers.length - 1) {
        console.log(`Falling back to next provider...`);
        continue;
      }
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
