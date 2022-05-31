import CustomError from '../../ErroHandler/customErro';
import { Motorcycle } from '../../interfaces/MotorcycleInterface';
import MotoModel from '../../models/Moto/motoSchema';
import MotoJoi from '../../validations/joiSchemas/motoSchemas';

import MongoService from '../Service/Service';

export default class MotorcycleService extends MongoService<Motorcycle> {
  private MotorcycleSchema = new MotoJoi();

  private validateBody = (obj: Motorcycle) => {
    const { MotorcycleSchema } = this;
    const isError = MotorcycleSchema.validate(obj);
    if (isError.error) {
      throw new CustomError(400, isError.error.message, 'cast');
    }
  };

  private validateId = async (id: string) => {
    const isValid = await this.model.readOne(id);
    if (id.length < 24) {
      throw new CustomError(
        400,
        'Id must have 24 hexadecimal characters',
        'cast',
      );
    }
    console.log(isValid, 'isvalid');
    if (!isValid) throw new CustomError(404, 'Object not found', 'cast');
  };

  constructor(model = new MotoModel()) {
    super(model);
  }

  create = async (obj: Motorcycle) => {
    const { MotorcycleSchema } = this;
    const isError = MotorcycleSchema.validate(obj);
    if (isError.error) throw new CustomError(400, 'Invalid inputs', 'joi');
    const newMotorcycle = await this.model.create(obj);
    return newMotorcycle;
  };

  readOne = async (id: string) => {
    const motorcycle = await this.model.readOne(id);
    if (!motorcycle) throw new CustomError(404, 'Object not found', 'cast');
    return motorcycle;
  };

  update = async (id: string, obj: Motorcycle) => {
    await this.validateBody(obj);
    await this.validateId(id);
    const updatedCar = await this.model.update(id, obj);
    return updatedCar;
  };

  delete = async (id: string) => {
    await this.validateId(id);
    return this.model.delete(id);
  };
}
