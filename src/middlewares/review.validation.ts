import { body, param } from "express-validator";
import Book from "../models/Book.model";

const doesBookExist = async (bookId: number) => {
  const book = await Book.findByPk(bookId);
  if (!book) {
    return Promise.reject("Book doesn't exist!");
  }
};

export const validateAddRating = [
  body("bookId").notEmpty().isInt().custom(doesBookExist),
  body("reviewContent").isString().optional(),
  body("rating").isInt({ min: 0, max: 5 }).notEmpty(),
];

export const validateGetReviews = [
  param("bookId").notEmpty().isInt().custom(doesBookExist),
];
