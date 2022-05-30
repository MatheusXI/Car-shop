import CustomError from '../../ErroHandler/customErro';
import { Car } from '../../interfaces/CarInterface';
import CarModel from '../../models/Car/carSchema';
import CarJoi from '../../validations/joiSchemas/carJoiSchemas';
import MongoService from '../Service/Service';

export default class CarService extends MongoService<Car> {
  constructor(model = new CarModel()) {
    super(model);
    this.create = async (obj: Car) => {
      const carSchema = new CarJoi();
      const isError = carSchema.validate(obj);

      if (isError.error) throw new CustomError(400, 'Invalid inputs', 'joi');

      const newCar = await this.model.create(obj);

      return newCar;
    };
  }
}
