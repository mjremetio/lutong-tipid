import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { env } from "../config/env";

interface AppError extends Error {
  statusCode?: number;
}

const isProduction = env.NODE_ENV === "production";

export function errorHandler(
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  // Always log the full error for debugging
  console.error("Error:", err.message);
  if (err.stack) {
    console.error("Stack:", err.stack);
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      error: "Validation Error",
      message: "The request data is invalid.",
      details: isProduction
        ? undefined
        : err.errors.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
    });
    return;
  }

  const statusCode = err.statusCode ?? 500;

  const friendlyMessages: Record<number, string> = {
    400: "The request could not be processed. Please check your input.",
    401: "Authentication is required.",
    403: "You do not have permission to perform this action.",
    404: "The requested resource was not found.",
    429: "Too many requests. Please try again later.",
    500: "Something went wrong on our end. Please try again later.",
  };

  // In production, never expose internal error details or stack traces
  const message = isProduction
    ? friendlyMessages[statusCode] ?? "An unexpected error occurred."
    : err.message || friendlyMessages[statusCode] || "An unexpected error occurred.";

  res.status(statusCode).json({
    error: friendlyMessages[statusCode] ?? "Error",
    message,
  });
}
