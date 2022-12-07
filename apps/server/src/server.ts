import Express from "express";
import cors from "cors";

import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter, createContext } from "./trpc";

const app = Express();
app.use(cors());

app.use("/trpc", createExpressMiddleware({ router: appRouter, createContext }));

app.use("/", (req, res) => {
  res.send("Hello world");
});

app.listen(4000);

export type AppRouter = typeof appRouter;
