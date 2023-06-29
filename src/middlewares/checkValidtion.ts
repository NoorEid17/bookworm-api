import { NextFunction, Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";

const checkValidationResult = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ validationErrors: result.array() });
  }
  req.body = matchedData(req, {
    includeOptionals: true,
  });
  next();
};

export default checkValidationResult;
