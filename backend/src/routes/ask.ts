const express = require("express");
const { getDoc } = require("../services/vector");
const { answerWithContext } = require("../services/llm");

const router = express.Router();

router.post("/", async (req: any, res: any, next: any) => {
  try {
    const { id, question } = req.body;
    if (!id || !question) {
      return res.status(400).json({ error: "Missing id or question" });
    }

    // 🔍 Retrieve the document chunks (vector store)
    const chunks = getDoc(id);
    if (!chunks) {
      return res.status(404).json({ error: "Document not found" });
    }

    // Just take the whole text for now (basic)
    const context = chunks.map((c: any) => ({
      text: c.text,
      page: c.page,
    }));

    // 🧠 Ask the LLM
    const answer = await answerWithContext(question, context);

    res.json({ answer });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
