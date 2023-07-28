import Category from "../models/Category.model";
import { NextFunction, Request, Response } from "express";

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

export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await Category.findAll();
    res.json({ categories });
  } catch (err) {
    next(err);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.userId;
    const category = await Category.findByPk(req.params["categoryId"]);

    if (category?.creator !== userId) {
      return res.status(403).json({ msg: "Access Forbidden" });
    }

    await category.destroy();

    res.json({ msg: "Category deleted successfully!" });
  } catch (err) {
    next(err);
  }
};
