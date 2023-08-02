import { NextFunction, Response, Request } from "express";
import Book from "../models/Book.model";
import Category from "../models/Category.model";

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

    const categoryIds = req.body.categories;

    await book.addCategories(categoryIds);
    await book.save();

    res.status(201).json({ msg: "Book created successfully!", book });
  } catch (err) {
    next(err);
  }
};

type query = { page: number; size: number };

export const getBooks = async (
  req: Request<{}, {}, {}, query>,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = Number(req.query.page || 1);
    const size = Number(req.query.size || 5);
    const { rows: books, count: totalBooks } = await Book.findAndCountAll({
      offset: (page - 1) * size,
      limit: size,
      include: Category,
    });
    const totalPages = Math.ceil(totalBooks / size);
    const nextPage = page + 1 > totalPages ? undefined : page + 1;
    res.json({ books, nextPage });
  } catch (err) {
    next(err);
  }
};

export const getBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const book = await Book.findOne({ where: { slug: req.params.slug } });
    if (!book) {
      return res.sendStatus(404);
    }
    res.json({ book });
  } catch (err) {
    next(err);
  }
};
