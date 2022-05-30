import { NextFunction, Request, Response } from 'express';
import { Car } from '../../interfaces/CarInterface';
import CarService from '../../services/Car/carService';
import Controller from '../Controller/controller';

export default class CarController extends Controller<Car> {
  private _route: string;

  constructor(service = new CarService(), route = '/cars') {
    super(service);
    this._route = route;
  }

  get route() {
    return this._route;
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newCar = await this.service.create(req.body);
      console.log(newCar, 'newCar controller');
      if (!newCar) throw new Error('erro');

      return res.status(201).json(newCar);
    } catch (error) {
      next(error);
    }
  };
}
