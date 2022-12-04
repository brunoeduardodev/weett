import SuperJSON from "superjson";
import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { prisma } from "@/database/prisma";
import { getUserFromToken } from "@/utils/jwt";
import { User } from "@prisma/client";

export const createContext = async ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  const token = req.headers.authorization;
  if (!token)
    return {
      prisma,
    };

  const user = await getUserFromToken(token);
  return {
    user,
    prisma,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
export type AuthorizedContext = Context & { user: User };

export const t = initTRPC.context<Context>().create({ transformer: SuperJSON });

export { appRouter } from "./routers";
export type { AppRouter } from "./routers";
