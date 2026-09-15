import path from "node:path";
import { config as loadEnv } from "dotenv";
import { defineConfig } from "prisma/config";

// Prisma 6 no longer auto-loads .env when a config file is present, so load it here.
loadEnv();

/**
 * Prisma configuration (replaces the deprecated `package.json#prisma` block).
 * Points to the schema and defines the seed command used by `prisma db seed`.
 */
export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),
  migrations: {
    seed: "tsx prisma/seed.ts",
  },
});
