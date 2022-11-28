import { t } from "../trpc";
import { healthRouter } from "./health";

export const appRouter = t.mergeRouters(healthRouter);
console.log(appRouter);
export type AppRouter = typeof appRouter;
