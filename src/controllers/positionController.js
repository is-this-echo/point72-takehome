const positionService = require("../services/positionService");

exports.getAllPositions = (req, res, next) => {
  try {
    const positions = positionService.getAllPositions();
    res.json(positions);
  } catch (err) {
    next(err);
  }
};

exports.getPositionsByAccount = (req, res, next) => {
  try {
    const { accountId } = req.params;
    const positions = positionService.getPositionsByAccount(accountId);
    res.json(positions);
  } catch (err) {
    next(err);
  }
};
