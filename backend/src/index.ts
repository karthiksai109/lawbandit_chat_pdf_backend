
import dotenv from "dotenv";
dotenv.config();
console.log("Groq API Key:", process.env.GROQ_API_KEY);

import express from "express";

import cors from "cors";


const allowedOrigins = [
  "http://localhost:3000", // local dev
  "https://lawbandit-chat-pdf-frontend-yjnc.vercel.app", // your Vercel frontend
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);


import uploadRouter from "./routes/upload.js";
import askRouter from "./routes/ask.js";
import { errorHandler } from "./middleware/errorHandler.js";



const app = express();
app.use(cors());
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
