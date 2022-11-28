import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter, Prisma } from "@weett/server";

export const trpc = createTRPCReact<AppRouter>();
