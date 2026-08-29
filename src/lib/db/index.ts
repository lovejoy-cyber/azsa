import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

declare global {
  // eslint-disable-next-line no-var
  var __azsaPool: Pool | undefined;
}

const pool =
  global.__azsaPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
  });

if (process.env.NODE_ENV !== "production") {
  global.__azsaPool = pool;
}

export const db = drizzle(pool, { schema });
export * as schema from "./schema";
