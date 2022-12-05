import * as trpcExpress from "@trpc/server/adapters/express";
import { prisma } from "@/database/prisma";
import { getUserFromToken } from "@/utils/jwt";
import { User } from "@prisma/client";
import { inferAsyncReturnType } from "@trpc/server";

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
export type AuthenticatedContext = Context & { user: User };
