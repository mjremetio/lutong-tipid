import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  PORT: number;
  DATABASE_URL: string;
  GEMINI_API_KEY: string;
  GEMINI_MODEL: string;
  GEMINI_FALLBACK_MODEL: string;
  CLIENT_URL: string;
  NODE_ENV: string;
}

function getEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[key] ?? defaultValue;
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const env: EnvConfig = {
  PORT: parseInt(getEnvVar("PORT", "3001"), 10),
  DATABASE_URL: getEnvVar("DATABASE_URL", ""),
  GEMINI_API_KEY: getEnvVar("GEMINI_API_KEY"),
  GEMINI_MODEL: getEnvVar("GEMINI_MODEL", "gemini-2.0-flash"),
  GEMINI_FALLBACK_MODEL: getEnvVar("GEMINI_FALLBACK_MODEL", "gemini-1.5-flash"),
  CLIENT_URL: getEnvVar("CLIENT_URL", "http://localhost:5173"),
  NODE_ENV: getEnvVar("NODE_ENV", "development"),
};
