import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  log: ["error", "info", "query", "warn"],
});
