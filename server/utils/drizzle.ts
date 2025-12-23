import * as schema from "../database/schema";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export const tables = schema;

const log = logger.withTag("Drizzle");

export function useDrizzle() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    log.error("DATABASE_URL environment variable is not set");
    throw new Error("DATABASE_URL environment variable is not set");
  }
  const client = postgres(connectionString, { prepare: false });
  log.success("Database connection established");
  return drizzle(client, { schema });
}

// 导出便捷的数据库实例
export const db = useDrizzle();
