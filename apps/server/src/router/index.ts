import path from "path";
import express from "express";
import { Router } from "express";
import { uploadRouter } from "./uploadRouter";

export const router = Router();
router.use("/upload", uploadRouter);

router.use(
  "/uploads",
  express.static(path.resolve(__dirname, "../../uploads"))
);
