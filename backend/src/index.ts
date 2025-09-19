const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const uploadRouter = require("./routes/upload");
const askRouter = require("./routes/ask");
const { errorHandler } = require("./middleware/errorHandler");

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
