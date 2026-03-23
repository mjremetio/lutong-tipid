import rateLimit from "express-rate-limit";

export const generateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: {
    error: "Rate limit exceeded",
    message: "Too many meal plan generation requests. Please wait a minute before trying again.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const swapLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: {
    error: "Rate limit exceeded",
    message: "Too many swap requests. Please wait a minute before trying again.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const recipeLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: {
    error: "Rate limit exceeded",
    message: "Too many recipe requests. Please wait a minute before trying again.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
