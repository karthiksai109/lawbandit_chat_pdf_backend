function errorHandler(err: any, req: any, res: any, next: any) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
  
  module.exports = { errorHandler };
  