const tradeRepository = require("../repositories/tradeRepository");

function computePositions(trades) {
  const map = new Map(); // key = `${accountId}|${symbol}`

  for (const t of trades) {
    const key = `${t.accountId}|${t.symbol}`;
    let pos = map.get(key);

    if (!pos) {
      pos = {
        accountId: t.accountId,
        symbol: t.symbol,
        netQuantity: 0,
        averagePrice: null,
        grossNotional: 0,
        lastTradePrice: null,
      };
      map.set(key, pos);
    }

    const signedQty = t.side === "BUY" ? t.quantity : -t.quantity;
    const signedNotional = signedQty * t.price;

    const prevNetQty = pos.netQuantity;
    const prevTotalNotional =
      pos.averagePrice !== null ? pos.averagePrice * prevNetQty : 0;

    const newNetQty = prevNetQty + signedQty;
    const newTotalNotional = prevTotalNotional + signedNotional;

    pos.netQuantity = newNetQty;
    pos.averagePrice = newNetQty !== 0 ? newTotalNotional / newNetQty : null;
    pos.grossNotional += Math.abs(t.quantity * t.price);
    pos.lastTradePrice = t.price;
  }

  return Array.from(map.values());
}

exports.getAllPositions = () => {
  const trades = tradeRepository.findAll();
  return computePositions(trades);
};

exports.getPositionsByAccount = (accountId) => {
  const trades = tradeRepository
    .findAll()
    .filter((t) => t.accountId === accountId);
  return computePositions(trades);
};
