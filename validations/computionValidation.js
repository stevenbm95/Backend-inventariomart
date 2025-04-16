import Joi from 'joi';

const consumptionSchema = Joi.object({
  drinkId: Joi.string().uuid().required(),
  userId: Joi.string().uuid().required(),
  amount: Joi.number().positive().required(),
  note: Joi.string().allow('', null).optional(),
  consumptionDate: Joi.date().required()
});

export { consumptionSchema }