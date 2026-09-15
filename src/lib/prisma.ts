import { PrismaClient } from "@prisma/client";

/**
 * Prisma client singleton. In development Next.js hot-reloads modules, which
 * would otherwise create a new client (and a new connection pool) on every
 * reload. Caching it on globalThis avoids exhausting DB connections.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

/** True when a database connection string is configured. */
export const hasDatabase = Boolean(process.env.DATABASE_URL);
