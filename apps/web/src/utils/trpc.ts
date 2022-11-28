import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@weett/server";

export const trpc = createTRPCReact<AppRouter>();
