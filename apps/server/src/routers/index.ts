import { t } from "../trpc";
import { authenticationRouter } from "./authentication";
import { feedRouter } from "./feed";
import { healthRouter } from "./health";

export const appRouter = t.router({
  health: healthRouter,
  authentication: authenticationRouter,
  feed: feedRouter,
});

export type AppRouter = typeof appRouter;
