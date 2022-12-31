import { envs } from "@/config/env";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter, Prisma } from "@weett/server";
import { getCookie } from "cookies-next";
import SuperJSON from "superjson";

const getBaseUrl = () => {
  const TRPC_URL = envs.trpcUrl;
  return TRPC_URL;
};

const getAuthCookie = () => {
  return getCookie("weett/auth");
};

export const serverTrpc = createTRPCProxyClient<AppRouter>({
  transformer: SuperJSON,
  links: [
    httpBatchLink({
      url: getBaseUrl(),
      headers() {
        const authorization = getAuthCookie();

        return {
          ...(authorization ? { authorization: String(authorization) } : {}),
        };
      },
    }),
  ],
});
