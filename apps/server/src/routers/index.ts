import { t } from "../trpc";
import { authenticationRouter } from "./authentication";
import { healthRouter } from "./health";

export const appRouter = t.mergeRouters(healthRouter, authenticationRouter);
export type AppRouter = typeof appRouter;
