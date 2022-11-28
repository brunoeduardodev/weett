import { t } from "../trpc";
import { healthRouter } from "./health";

export const appRouter = t.mergeRouters(healthRouter);
export type AppRouter = typeof appRouter;
