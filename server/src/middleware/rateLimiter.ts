import rateLimit from "express-rate-limit";

export const generateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 1,
  message: {
    error: "Rate limit exceeded",
    message: "Isang meal plan generation lang per minute. Maghintay ng konti bago mag-try ulit!",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const swapLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 3,
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
