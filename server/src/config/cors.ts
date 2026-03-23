import { CorsOptions } from "cors";
import { env } from "./env.js";

const allowedOrigins: (string | undefined)[] = [env.CLIENT_URL];

if (env.NODE_ENV === "development") {
  allowedOrigins.push("http://localhost:5173");
  allowedOrigins.push("http://localhost:3000");
}

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (server-side requests, curl, etc.)
    if (!origin) {
      return callback(null, true);
    }
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    // In production, also allow *.vercel.app domains
    if (env.NODE_ENV === "production" && origin.endsWith(".vercel.app")) {
      return callback(null, true);
    }
    callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
