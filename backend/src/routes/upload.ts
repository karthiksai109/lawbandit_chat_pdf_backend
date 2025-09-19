import express from "express";
import multer from "multer";
import { uploadFile } from "../services/embed.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const id = await uploadFile(req.file);
    res.json({ id });
  } catch (err) {
    next(err);
  }
});

export default router;
