const tradeRepository = require("../repositories/tradeRepository");
const { generateId } = require("../utils/idGenerator");

exports.createTrade = (payload) => {
  const now = new Date();

  const trade = {
    id: generateId(),
    accountId: payload.accountId,
    symbol: payload.symbol.toUpperCase(),
    side: payload.side, // 'BUY' or 'SELL'
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
    if (filters.symbol && t.symbol !== filters.symbol.toUpperCase())
      return false;
    return true;
  });
};

exports.getTradeById = (id) => {
  return tradeRepository.findById(id);
};
