import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const validator = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};
