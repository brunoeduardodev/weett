import multer from "multer";
const upload = multer({ dest: "uploads/" });
import { Router } from "express";

export const uploadRouter = Router();

uploadRouter.post("/profile-picture", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  if (!req.file.mimetype.startsWith("image/")) {
    return res.status(400).json({ error: "File is not an image" });
  }

  return res.status(200).json({ url: req.file.destination });
});
