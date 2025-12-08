const Joi = require("joi");

const tradeSchema = Joi.object({
  accountId: Joi.string().trim().min(1).required(),
  symbol: Joi.string().trim().min(1).required(),
  side: Joi.string().valid("BUY", "SELL").required(),
  quantity: Joi.number().integer().positive().required(),
  price: Joi.number().positive().required(),
  tradeTime: Joi.date().iso().optional(),
  metadata: Joi.object().unknown(true).optional(),
});

exports.validateTradePayload = (payload) => {
  return tradeSchema.validate(payload, {
    abortEarly: false,
    stripUnknown: true,
  });
};
