import Joi from 'joi';

const drinkSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  unit: Joi.string().valid('ml', 'L', 'botella', 'unidad', 'lata', 'laton', 'botellon' ).required(),
  quantity: Joi.number().min(0).required(),
  purchasePrice: Joi.number().min(0).required(),
  salePrice: Joi.number().min(0).required()
});

export { drinkSchema }