import dotenv from "dotenv";
dotenv.config(); // ✅ Load .env first

import express from "express";
import cors from "cors";

import uploadRouter from "./routes/upload";
import askRouter from "./routes/ask";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/upload", uploadRouter);
app.use("/api/ask", askRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
