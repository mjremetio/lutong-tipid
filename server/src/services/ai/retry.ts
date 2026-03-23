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

      if (attempt === maxRetries) {
        break;
      }
    }
  }

  throw new Error(
    `Failed after ${maxRetries + 1} attempts. Last error: ${lastError?.message}`
  );
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
