import User from "../models/User.model";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { hash } from "bcryptjs";

const generateAccessToken = (user: User) => {
  const payload = user.toJSON();
  delete payload.password;
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "30min",
  });
  return token;
};

const generateRefreshToken = async (user: User) => {
  const payload = { userId: user.userId };
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "7days",
  });
  return token;
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.body.password = await hash(
      req.body.password,
      process.env.BCRYPT_SALT || 10
    );
    const user = await User.create(req.body);

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });

    res
      .status(201)
      .json({ msg: "That's okay!", user: user.toJSON(), token: accessToken });
  } catch (err) {
    next(err);
  }
};
