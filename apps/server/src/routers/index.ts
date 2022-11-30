import { t } from "../trpc";
import { authenticationRouter } from "./authentication";
import { feedRouter } from "./feed";
import { healthRouter } from "./health";

export const appRouter = t.router({
  auth: authenticationRouter,
  feed: feedRouter,
  health: healthRouter,
});

export type AppRouter = typeof appRouter;
