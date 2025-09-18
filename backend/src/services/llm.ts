const Groq = require("groq-sdk");

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function answerWithContext(question: string, contexts: { text: string; page: number }[]) {
  const contextBlock = contexts.map(c => `[p. ${c.page}] ${c.text}`).join("\n");

  const res = await client.chat.completions.create({
    model: "llama-3.1-8b-instant",   // ✅ updated to supported model
    messages: [
      { role: "system", content: "Answer ONLY from the provided context. Use [p. X] for citations." },
      { role: "user", content: `Context:\n${contextBlock}\n\nQ: ${question}` },
    ],
    temperature: 0.2,
  });

  return res.choices[0]?.message?.content || "";
}

module.exports = { answerWithContext };

