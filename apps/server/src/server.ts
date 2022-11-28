import { createExpressMiddleware } from "@trpc/server/adapters/express";
import Express from "express";
import { appRouter, createContext } from "./trpc";

const app = Express();
app.use("/trpc", createExpressMiddleware({ router: appRouter, createContext }));

app.listen(4000);

export type AppRouter = typeof appRouter;
