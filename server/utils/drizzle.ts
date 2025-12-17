import * as schema from "../database/schema";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

export const tables = schema;

let pool: Pool | null = null;

export function useDrizzle() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL!,
    });
  }
  return drizzle(pool, { schema });
}
