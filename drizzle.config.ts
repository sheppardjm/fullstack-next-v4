import "dotenv/config";
import assert from "node:assert";
import { defineConfig } from "drizzle-kit";

assert(
  process.env.DATABASE_URL,
  "DATABASE_URL is not defined in environment variables",
);

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
