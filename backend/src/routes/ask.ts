import express from "express";
import { getDoc } from "../services/vector";
import { answerWithContext } from "../services/llm";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { id, question } = req.body;
    if (!id || !question) {
      return res.status(400).json({ error: "Missing id or question" });
    }

    const chunks = getDoc(id);
    if (!chunks) {
      return res.status(404).json({ error: "Document not found" });
    }

    const context = chunks.map((c: any) => ({
      text: c.text,
      page: c.page,
    }));

    const answer = await answerWithContext(question, context);

    res.json({ answer });
  } catch (err) {
    next(err);
  }
});

export default router;
