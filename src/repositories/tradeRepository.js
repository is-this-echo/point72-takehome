let trades = [];

exports.save = (trade) => {
  trades.push(trade);
  return trade;
};

exports.findAll = () => {
  return trades.slice();
};

exports.findById = (id) => {
  return trades.find((t) => t.id === id) || null;
};

exports.clearAll = () => {
  trades = [];
};
