const express = require("express");
const router = express.Router();
const positionController = require("../controllers/positionController");

// GET /api/positions
router.get("/", positionController.getAllPositions);

// GET /api/positions/:accountId
router.get("/:accountId", positionController.getPositionsByAccount);

module.exports = router;
