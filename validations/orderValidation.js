import Joi from "joi";

const orderItemSchema = Joi.object({
  drinkId: Joi.number().required(),
  quantity: Joi.number().positive().required(),
  price: Joi.number().positive().required(),
});

const orderSchema = Joi.object({
  userId: Joi.number().required(),
  items: Joi.array().items(orderItemSchema).min(1).required(),
  totalAmount: Joi.number().positive().required(),
});

export { orderSchema, orderItemSchema };