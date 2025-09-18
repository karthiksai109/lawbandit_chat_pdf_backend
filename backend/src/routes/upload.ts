const express = require("express");
const multer = require("multer");
const pdf = require("pdf-parse");
const { v4: uuid } = require("uuid");
const { embedTexts } = require("../services/embed");
const { saveDoc } = require("../services/vector");

const router = express.Router();
const upload = multer();

router.post("/", upload.single("file"), async (req: any, res: any, next: any) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const data = await pdf(req.file.buffer);
    const text = data.text.replace(/\s+/g, " ");
    const chunks = [{ id: uuid(), text, page: 1 }];

    const embeddings = await embedTexts(chunks.map(c => c.text));
    chunks.forEach((c, i) => (c.vector = embeddings[i]));

    const docId = uuid();
    saveDoc(docId, chunks);

    // 🔥 Return "id" instead of "docId" for frontend
    res.json({ id: docId, chunkCount: chunks.length });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
