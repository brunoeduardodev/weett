import Express from "express";
import cors from "cors";

import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter, createContext } from "./trpc";
import { router } from "./router";

const app = Express();
app.use(cors());

app.use("/trpc", createExpressMiddleware({ router: appRouter, createContext }));
app.use(router);

app.listen(4000);

export type AppRouter = typeof appRouter;
