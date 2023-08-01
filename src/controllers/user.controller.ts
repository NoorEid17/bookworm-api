import User from "../models/User.model";
import { Request, Response, NextFunction } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { hash, compare } from "bcryptjs";

const generateAccessToken = (user: User) => {
  const payload = user.toJSON();
  delete payload.password;
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "30min",
  });
  return token;
};

const generateRefreshToken = (user: User) => {
  const payload = { userId: user.userId };
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "7days",
  });
  return token;
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies["refreshToken"];
    if (!token) {
      return res.status(403).json({ msg: "No refresh token provided!" });
    }
    const payload: any = jwt.verify(token, process.env.JWT_SECRET!);
    const userId = payload.userId;
    const user = await User.findByPk(userId);
    console.log(user);
    const accessToken = generateAccessToken(user!);

    res.json({ token: accessToken });
  } catch (err: any) {
    if (err instanceof JsonWebTokenError || err instanceof TokenExpiredError) {
      return res.status(400).json({ msg: "Access forbidden!" });
    }
    next(err);
  }
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

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });

    if (!user) {
      return res.status(400).json({ msg: "Username not found!" });
    }

    const isPasswordCorrect = await compare(req.body.password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ msg: "Password is incorrect!" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });

    res.json({ msg: "User logged in successfully!", token: accessToken, user });
  } catch (err) {
    next(err);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie("refreshToken");
    res.json({ msg: "User logged out" });
  } catch (err) {
    next(err);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findByPk(req.user.userId);

    if (req.body.newPassword) {
      const isOldPasswordMatched = await compare(
        req.body.oldPassword,
        user?.password!
      );
      if (!isOldPasswordMatched) {
        return res.status(400).json({ error: { msg: "Incorrect Password" } });
      }
      req.body.password = await hash(
        req.body.newPassword,
        process.env.BCRYPT_SALT!
      );
      delete req.body.oldPassword;
      delete req.body.newPassword;
    }

    user?.set({ ...req.body });

    if (req.file) {
      user!.avatar = req.file.filename;
    }

    await user?.save();

    const userPayload = user?.toJSON();
    delete userPayload.password;

    res.json({ msg: "User updated successfully!", user: userPayload });
  } catch (err) {
    next(err);
  }
};
