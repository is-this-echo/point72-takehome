module.exports = (req, res, next) => {
  res.status(404).json({
    message: "Resource requested was not found",
    path: req.originalUrl,
  });
};
