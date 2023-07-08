import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
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
    next(err);
  }
};

export default checkAuth;
