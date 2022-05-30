import { NextFunction, Request, Response } from "express";
import HandleError from "./handleError";

const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // console.log(err, 'errosad');
  const newErro = new HandleError(err).erro;
  console.log(newErro, 'middleware');
  if (newErro.error) {
    return res.status(newErro.code).json({ error: newErro.error });
  }
  return res.status(newErro.code).json({ message: newErro.message });
  next();
};
export default errorMiddleware;
