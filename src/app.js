const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const tradeRoutes = require("./routes/tradeRoutes");
const positionRoutes = require("./routes/positionRoutes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(morgan("dev"));

  app.use("/api/trades", tradeRoutes);
  app.use("/api/positions", positionRoutes);

  // error handling and unknown endpoint handlers
  app.use(notFound);
  app.use(errorHandler);

  return app;
}

module.exports = createApp;
