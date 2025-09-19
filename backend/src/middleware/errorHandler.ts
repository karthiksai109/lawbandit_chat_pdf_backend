function errorHandler(err: any, req: any, res: any, next: any) {
  console.error(err.stack || err);
  res.status(500).json({ error: "Something broke!" });
}

module.exports = { errorHandler };
