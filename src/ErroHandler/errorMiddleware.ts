import { NextFunction, Request, Response } from 'express';
import HandleError from './handleError';

const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  console.log(err, 'errosad');
  const { code, message } = new HandleError(err).erro;
  return res.status(code).json({ message });
};
export default errorMiddleware;
