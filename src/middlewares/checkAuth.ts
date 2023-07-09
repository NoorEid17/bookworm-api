import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import User from "../models/User.model";

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ msg: "Access forbidden!" });
  }

  try {
    const payload = await jwt.verify(token, process.env.JWT_SECRET!);
    req.user = payload as User;
    next();
  } catch (err) {
    if (err instanceof JsonWebTokenError || err instanceof TokenExpiredError) {
      return res.status(400).json({ msg: "Access forbidden!" });
    }
    next(err);
  }
};

export default checkAuth;
