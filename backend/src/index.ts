const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
require("dotenv").config();
console.log("✅ Using Groq API Key:", process.env.GROQ_API_KEY ? "YES" : "NO");



const uploadRouter = require("./routes/upload");
const askRouter = require("./routes/ask");
const { errorHandler } = require("./middleware/errorHandler");




const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/upload", uploadRouter);
app.use("/api/ask", askRouter);

// Error middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
