const tradeRepository = require("../repositories/tradeRepository");
const { generateId } = require("../utils/idGenerator");

exports.createTrade = (payload) => {
  const now = new Date();

  const trade = {
    id: generateId(),
    accountId: payload.accountId,
    ticker: payload.ticker.toUpperCase(),
    side: payload.side, // BUY / SELL
    quantity: payload.quantity,
    price: payload.price,
    tradeTime: payload.tradeTime
      ? new Date(payload.tradeTime).toISOString()
      : now.toISOString(),
    metadata: payload.metadata || null,
  };

  tradeRepository.save(trade);
  return trade;
};

exports.getTrades = (filters = {}) => {
  const allTrades = tradeRepository.findAll();

  return allTrades.filter((t) => {
    if (filters.accountId && t.accountId !== filters.accountId) return false;
    if (filters.ticker && t.ticker !== filters.ticker.toUpperCase())
      return false;
    return true;
  });
};

exports.getTradeById = (id) => {
  return tradeRepository.findById(id);
};
