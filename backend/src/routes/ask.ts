import express from "express";
import { topK } from "../services/vector.js";
import { embedText } from "../services/embed.js";
import { answerWithContext } from "../services/llm.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { id, question } = req.body;
    if (!id || !question) {
      return res.status(400).json({ error: "Missing id or question" });
    }

    // 1. Embed the question
    const queryVec = await embedText(question);

    // 2. Get the top 5 most relevant chunks
    const chunks = topK(id, queryVec, 5);

    if (!chunks || chunks.length === 0) {
      return res.status(404).json({ error: "No relevant content found" });
    }

    // 3. Build the context for the LLM
    const context = chunks.map((c) => ({
      text: c.text,
      page: c.page,
    }));

    // 4. Ask the LLM with narrowed context
    const answer = await answerWithContext(question, context);

    res.json({ answer });
  } catch (err) {
    next(err);
  }
});

export default router;

