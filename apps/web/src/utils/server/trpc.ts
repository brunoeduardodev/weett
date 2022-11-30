import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter, Prisma } from "@weett/server";
import SuperJSON from "superjson";

const getBaseUrl = () => {
  const TRPC_URL = process.env.NEXT_PUBLIC_TRPC_URL || "";
  return TRPC_URL;
};

export const trpcClient = createTRPCProxyClient<AppRouter>({
  transformer: SuperJSON,
  links: [httpBatchLink({ url: getBaseUrl() })],
});
