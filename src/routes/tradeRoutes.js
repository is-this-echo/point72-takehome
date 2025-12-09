const express = require("express");
const router = express.Router();
const tradeController = require("../controllers/tradeController");

// GET /api/trades?accountId=...&ticker=...
router.get("/", tradeController.getTrades);

// GET /api/trades/:id
router.get("/:id", tradeController.getTradeById);

// POST /api/trades
router.post("/", tradeController.createTrade);

module.exports = router;
