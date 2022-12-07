import path from "path";
import multer from "multer";

const uploadsFolder = path.resolve(__dirname, "../../uploads");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsFolder);
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniquePrefix}-${file.originalname}`);
  },
});

const upload = multer({ dest: "uploads/", storage });
import { Router } from "express";

export const uploadRouter = Router();

uploadRouter.post("/profile-picture", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  if (!req.file.mimetype.startsWith("image/")) {
    return res.status(400).json({ error: "File is not an image" });
  }

  return res
    .status(200)
    .json({ url: "http://localhost:4000/uploads/" + req.file.filename });
});
