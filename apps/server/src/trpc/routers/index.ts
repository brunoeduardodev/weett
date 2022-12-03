import { t } from "..";
import { authenticationRouter } from "./authentication";
import { feedRouter } from "./feed";
import { healthRouter } from "./health";
import { userRouter } from "./user";

export const appRouter = t.router({
  health: healthRouter,
  authentication: authenticationRouter,
  feed: feedRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
