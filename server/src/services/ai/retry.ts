/** Check if an error is a rate limit (429) error — no point retrying */
function isRateLimitError(error: unknown): boolean {
  if (error && typeof error === "object") {
    const err = error as Record<string, unknown>;
    if (err.status === 429 || err.statusCode === 429) return true;
    if (typeof err.message === "string" && /rate.limit|quota|resource.*exhausted/i.test(err.message)) return true;
  }
  return false;
}

/** Extract a clean, user-friendly error message */
function friendlyErrorMessage(error: unknown): string {
  const raw = error instanceof Error ? error.message : String(error);

  // Rate limit / quota
  if (/rate.limit|quota|resource.*exhausted/i.test(raw)) {
    const retryMatch = raw.match(/try again in (\d+m[\d.]+s|\d+s)/i);
    const retryIn = retryMatch ? ` Subukan ulit sa ${retryMatch[1]}.` : " Subukan ulit mamaya.";
    return `Nag-hit na ng limit ang AI service natin ngayon.${retryIn} Pasensya na!`;
  }

  // Auth errors
  if (raw.includes("401") || raw.includes("authentication") || raw.includes("invalid_api_key")) {
    return "May problema sa AI service configuration. Please contact the developer.";
  }

  // Timeout
  if (raw.includes("timeout") || raw.includes("ETIMEDOUT")) {
    return "Medyo matagal mag-respond ang AI. Subukan ulit mamaya.";
  }

  // Validation / JSON parse errors (our own)
  if (raw.includes("JSON") || raw.includes("parse") || raw.includes("Zod")) {
    return "Hindi nag-generate ng maayos na meal plan ang AI. Subukan ulit.";
  }

  // Budget exceeded
  if (raw.includes("exceeds budget")) {
    return "Hindi kasya ang budget sa generated plan. Subukan ulit o dagdagan ang budget.";
  }

  // Generic
  return "May problema sa pag-generate ng meal plan. Subukan ulit mamaya.";
}

export async function withRetry<T>(
  fn: () => Promise<string>,
  validate: (data: unknown) => T,
  maxRetries: number = 2
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const raw = await fn();
      const cleaned = stripMarkdownFences(raw);
      const parsed: unknown = JSON.parse(cleaned);
      return validate(parsed);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.warn(
        `Attempt ${attempt + 1}/${maxRetries + 1} failed: ${lastError.message}`
      );

      // Don't retry rate limit errors — they won't succeed
      if (isRateLimitError(error)) {
        break;
      }

      if (attempt === maxRetries) {
        break;
      }
    }
  }

  throw new Error(friendlyErrorMessage(lastError));
}

function stripMarkdownFences(text: string): string {
  const trimmed = text.trim();
  const fenceRegex = /^```(?:json)?\s*\n?([\s\S]*?)\n?\s*```$/;
  const match = trimmed.match(fenceRegex);
  if (match) {
    return match[1].trim();
  }
  return trimmed;
}
