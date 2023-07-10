import Category from "../models/Category.model";
import { Request, Response } from "express";

export const createCategory = async (
  req: Request,
  res: Response,
  next: any
) => {
  try {
    const category = await Category.create({
      ...req.body,
      creator: req.user.userId,
    });
    res.status(201).json({ msg: "Category created successfully!", category });
  } catch (err) {
    next(err);
  }
};
