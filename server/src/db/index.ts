import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { env } from "../config/env.js";
import * as schema from "./schema.js";

let _db: ReturnType<typeof drizzle<typeof schema>> | null = null;

export const db = new Proxy({} as ReturnType<typeof drizzle<typeof schema>>, {
  get(_target, prop) {
    if (!_db) {
      if (!env.DATABASE_URL) {
        throw new Error("DATABASE_URL is not configured. Database operations are unavailable.");
      }
      const pool = new pg.Pool({ connectionString: env.DATABASE_URL });
      _db = drizzle(pool, { schema });
    }
    return (_db as any)[prop];
  },
});
