import path from "node:path";
import { defineConfig } from "prisma/config";

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
