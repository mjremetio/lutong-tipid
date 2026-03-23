import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { env } from "./config/env";
import { corsOptions } from "./config/cors";
import { errorHandler } from "./middleware/errorHandler";
import { securityHeaders } from "./middleware/securityHeaders";
import mealplanRoutes from "./routes/mealplan.routes";
import groceryRoutes from "./routes/grocery.routes";
import recipeRoutes from "./routes/recipe.routes";
import healthRoutes from "./routes/health.routes";

const app = express();

// Security middleware
app.use(helmet());
app.use(securityHeaders);

// Global rate limiter: 100 requests per minute per IP
const globalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests. Please try again later." },
});
app.use(globalLimiter);

// CORS and body parsing
app.use(cors(corsOptions));
app.use(express.json({ limit: "1mb" }));

// Routes
app.use("/api/health", healthRoutes);
app.use("/api/mealplan", mealplanRoutes);
app.use("/api/grocery", groceryRoutes);
app.use("/api/recipe", recipeRoutes);

// Error handler (must be last)
app.use(errorHandler);

export default app;
