import { TRPCError } from "@trpc/server";
import { t } from "../trpc";

export const ensureAuthenticated = t.middleware(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "You should be authenticated",
    });
  }

  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});
