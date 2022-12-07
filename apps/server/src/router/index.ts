import { Router } from "express";
import { uploadRouter } from "./uploadRouter";

export const router = Router();
router.use("/upload", uploadRouter);
