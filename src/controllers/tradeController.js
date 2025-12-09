const tradeService = require("../services/tradeService");
const { validateTradePayload } = require("../validation/tradeValidation");

exports.getTrades = (req, res, next) => {
  try {
    const filters = {
      accountId: req.query.accountId,
      ticker: req.query.ticker,
    };

    const trades = tradeService.getTrades(filters);
    res.json(trades);
  } catch (err) {
    next(err);
  }
};

exports.getTradeById = (req, res, next) => {
  try {
    const trade = tradeService.getTradeById(req.params.id);
    if (!trade) {
      return res.status(404).json({ message: "Trade not found" });
    }
    res.json(trade);
  } catch (err) {
    next(err);
  }
};

exports.createTrade = (req, res, next) => {
  try {
    const { error, value } = validateTradePayload(req.body);

    if (error) {
      return res.status(400).json({
        message: "Invalid trade payload",
        details: error.details.map((d) => d.message),
      });
    }

    const created = tradeService.createTrade(value);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};
