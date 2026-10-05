function logger(req, res, next) {
  const startedAt = Date.now();

  res.on('finish', () => {
    const elapsedMs = Date.now() - startedAt;
    const timestamp = new Date().toISOString();
    console.log(`${timestamp} ${req.method} ${req.originalUrl} ${res.statusCode} ${elapsedMs}ms`);
  });

  next();
}

module.exports = logger;
