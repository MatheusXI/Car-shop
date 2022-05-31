import { NextFunction, Request, Response } from 'express';
import { Motorcycle } from '../../interfaces/MotorcycleInterface';
import MotoService from '../../services/Moto/motoService';
import Controller from '../Controller/controller';

export default class MotoController extends Controller<Motorcycle> {
  private _route: string;

  constructor(service = new MotoService(), route = '/motorcycles') {
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
      const updatedMoto = await this.service.update(req.params.id, req.body);
      return res.status(200).json(updatedMoto);
    } catch (error) {
      next(error);
    }
  };

  readOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const Moto = await this.service.readOne(req.params.id);
      return res.status(200).json(Moto);
    } catch (error) {
      next(error);
    }
  };

  read = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const Motos = await this.service.read();
      return res.status(200).json(Motos);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newMoto = await this.service.create(req.body);

      return res.status(201).json(newMoto);
    } catch (error) {
      next(error);
    }
  };
}
