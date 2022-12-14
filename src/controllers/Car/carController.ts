import { NextFunction, Request, Response } from 'express';
import { Car } from '../../interfaces/CarInterface';
import CarService from '../../services/Car/carService';
import Controller from '../Controller/controller';

export default class CarController extends Controller<Car> {
  private _route: string;

  constructor(protected service = new CarService(), route = '/cars') {
    super(service);
    this._route = route;
  }

  get route() {
    return this._route;
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.delete(req.params.id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedCar = await this.service.update(req.params.id, req.body);
      return res.status(200).json(updatedCar);
    } catch (error) {
      next(error);
    }
  };

  readOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const car = await this.service.readOne(req.params.id);
      return res.status(200).json(car);
    } catch (error) {
      next(error);
    }
  };

  read = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cars = await this.service.read();
      return res.status(200).json(cars);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newCar = await this.service.create(req.body);
      if (!newCar) throw new Error('erro');

      return res.status(201).json(newCar);
    } catch (error) {
      next(error);
    }
  };
}
