import Joi from 'joi';

const inventoryChangeSchema = Joi.object({
  drinkId: Joi.string().uuid().required(),
  change: Joi.number().required(), // puede ser positivo o negativo
  note: Joi.string().optional(),
  reason: Joi.string().allow('', null).optional()
});

export { inventoryChangeSchema }



