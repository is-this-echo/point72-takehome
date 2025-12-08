module.exports = (err, req, res, next) => {
  console.error(err);

  // You can extend this to look for custom error types with status codes.
  const status = err.status || 500;
  const message = err.message || "Internal server error";

  res.status(status).json({
    message,
    // In real prod you probably hide stack; for take-home it’s okay to show.
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};
