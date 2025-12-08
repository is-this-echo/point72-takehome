let trades = [];

exports.save = (trade) => {
  trades.push(trade);
  return trade;
};

exports.findAll = () => {
  // shallow copy to avoid external mutation
  return trades.slice();
};

exports.findById = (id) => {
  return trades.find((t) => t.id === id) || null;
};

// Handy for tests
exports.clearAll = () => {
  trades = [];
};
