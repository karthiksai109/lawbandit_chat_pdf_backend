import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import uploadRouter from "./routes/upload.js";
import askRouter from "./routes/ask.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();   // 👈 initialize app first

// Explicit CORS setup
const allowedOrigins = [
  "http://localhost:3000", 
  "https://lawbandit-chat-pdf-frontend-yjnc.vercel.app"
];

app.use(
  cors({
    origin: "*",   // 👈 allow all origins for now
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

// Routes
app.use("/api/upload", uploadRouter);
app.use("/api/ask", askRouter);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
