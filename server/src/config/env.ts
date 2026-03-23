import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  PORT: number;
  DATABASE_URL: string;
  GROQ_API_KEY: string;
  GROQ_MODEL: string;
  GROQ_FALLBACK_MODEL: string;
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
  GROQ_API_KEY: getEnvVar("GROQ_API_KEY"),
  GROQ_MODEL: getEnvVar("GROQ_MODEL", "llama-3.3-70b-versatile"),
  GROQ_FALLBACK_MODEL: getEnvVar("GROQ_FALLBACK_MODEL", "llama-3.1-8b-instant"),
  CLIENT_URL: getEnvVar("CLIENT_URL", "http://localhost:5173"),
  NODE_ENV: getEnvVar("NODE_ENV", "development"),
};
