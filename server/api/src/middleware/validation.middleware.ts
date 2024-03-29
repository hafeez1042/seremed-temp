import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/RequestValidationError";

export const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array())
  }
  next();
};
