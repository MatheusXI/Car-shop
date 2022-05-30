import { NextFunction, Request, Response } from 'express';
import CarJoi from '../joiSchemas/carJoiSchemas';

const validateCar = (req: Request, res: Response, next: NextFunction) => {
  try {
    const carSchema = new CarJoi();
    carSchema.validate(req.body);
    next();
  } catch (error) {
    return res.status(400).json('error');
  }
};
export default validateCar;
