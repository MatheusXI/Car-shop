import { NextFunction, Request, Response } from 'express';
import HandleError from './handleError';

const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(err, 'errosad');
  const { code, message } = new HandleError(err).erro;
  next();
  return res.status(code).json({ message });
};
export default errorMiddleware;
