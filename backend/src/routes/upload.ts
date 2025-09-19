const express = require("express");
const multer = require("multer");
const { uploadFile } = require("../services/embed");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const id = await uploadFile(req.file);
    res.json({ id });
  } catch (err) {
    next(err);
  }
});

module.exports = router;   // ✅ Export router for require()
