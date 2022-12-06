import multer from "multer";
import Express from "express";
import cors from "cors";

const upload = multer({ dest: "uploads/" });

import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter, createContext } from "./trpc";

const app = Express();
app.use(cors());

app.use("/trpc", createExpressMiddleware({ router: appRouter, createContext }));

app.use("/", (req, res) => {
  res.send("Hello world");
});

app.post("/uploads/profile-picture", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }

  if (!req.file.mimetype.startsWith("image/")) {
    return res.status(400).send("File is not an image");
  }

  console.log(req.file);
  return req.file.destination;
});

app.listen(4000);

export type AppRouter = typeof appRouter;
