import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { getCookie } from "cookies-next";
import { PropsWithChildren, useState } from "react";
import { trpc } from "../utils/trpc";

const getBaseUrl = () => {
  const TRPC_URL = process.env.NEXT_PUBLIC_TRPC_URL || "";
  return TRPC_URL;
};

const getAuthCookie = () => {
  return getCookie("weett/auth");
};

export const TRPCProvider = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: getBaseUrl(),
          headers() {
            const authorization = getAuthCookie();

            return {
              ...(authorization
                ? { authorization: String(authorization) }
                : {}),
            };
          },
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};
