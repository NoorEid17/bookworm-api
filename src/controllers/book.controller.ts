import { NextFunction, Response, Request } from "express";
import Book from "../models/Book.model";

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "Book Cover is required!" });
    }
    const book = await Book.create({
      ...req.body,
      cover: req.file?.filename,
      creator: req.user.userId,
    });
    res.status(201).json({ msg: "Book created successfully!", book });
  } catch (err) {
    next(err);
  }
};
