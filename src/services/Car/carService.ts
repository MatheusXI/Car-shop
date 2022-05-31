import CustomError from '../../ErroHandler/customErro';
import { Car } from '../../interfaces/CarInterface';
import CarModel from '../../models/Car/carSchema';
import CarJoi from '../../validations/joiSchemas/carJoiSchemas';
import MongoService from '../Service/Service';

export default class CarService extends MongoService<Car> {
  private carSchema = new CarJoi();

  private validateBody = (obj: Car) => {
    const { carSchema } = this;
    const isError = carSchema.validate(obj);
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

  constructor(model = new CarModel()) {
    super(model);
  }

  create = async (obj: Car) => {
    const { carSchema } = this;
    const isError = carSchema.validate(obj);
    if (isError.error) throw new CustomError(400, 'Invalid inputs', 'joi');
    const newCar = await this.model.create(obj);
    return newCar;
  };

  readOne = async (id: string) => {
    const car = await this.model.readOne(id);
    if (!car) throw new CustomError(404, 'Object not found', 'cast');
    return car;
  };

  update = async (id: string, obj: Car) => {
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
