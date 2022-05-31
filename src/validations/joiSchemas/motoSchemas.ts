import Joi from 'joi';
import { Motorcycle } from '../../interfaces/MotorcycleInterface';

export default class MotoJoi {
  protected motoSchema = Joi.object({
    _id: Joi.string().min(24),
    model: Joi.string().min(3).required(),
    year: Joi.number().min(1900).max(2022).required(),
    color: Joi.string().min(3).required(),
    status: Joi.boolean(),
    buyValue: Joi.number().integer().required(),
    category: Joi.string().valid('Street', 'Custom', 'Trail').required(),
    engineCapacity: Joi.number().integer().max(2500).required(),
  });

  public validate(obj: Motorcycle) {
    return this.motoSchema.validate(obj);
  }
}
