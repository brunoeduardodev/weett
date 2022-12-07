import { Router } from "express";
import { uploadRouter } from "./uploadRouter";

const router = Router();
router.use("/upload", uploadRouter);
