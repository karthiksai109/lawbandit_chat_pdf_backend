const express = require("express");
const { getDoc } = require("../services/vector");
const { answerWithContext } = require("../services/llm");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { id, question } = req.body;
    if (!id || !question) {
      return res.status(400).json({ error: "Missing id or question" });
    }

    // Retrieve document chunks
    const chunks = getDoc(id);
    if (!chunks) {
      return res.status(404).json({ error: "Document not found" });
    }

    // Use all chunks as context (for now)
    const context = chunks.map((c) => ({
      text: c.text,
      page: c.page,
    }));

    // Call the LLM with context
    const answer = await answerWithContext(question, context);

    res.json({ answer });
  } catch (err) {
    next(err);
  }
});

module.exports = router;   // ✅ Export router for require()
