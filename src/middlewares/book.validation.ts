import { body } from "express-validator";
import Book from "../models/Book.model";
import Category from "../models/Category.model";

const checkIfCategoryExists = async (categoryId: number) => {
  const category = await Category.findByPk(categoryId);
  if (category) return true;
  return false;
};

const isTitleUsed = async (title: string) => {
  const slug = title.trim().toLowerCase().split(" ").join("_");
  const book = await Book.findOne({ where: { slug } });
  if (book) return true;
  return false;
};

export const validateCreate = [
  body("title")
    .notEmpty()
    .isString()
    .isLength({ min: 2, max: 100 })
    .custom(async (value) => {
      if (await isTitleUsed(value))
        return Promise.reject("title is already used!");
    }),
  body("description").notEmpty().isString().isLength({ min: 2, max: 1000 }),
  body("categories")
    .notEmpty()
    .isArray()
    .custom(async (values) => {
      for (const categoryId of values) {
        if (!(await checkIfCategoryExists(categoryId))) {
          return Promise.reject("Category doesn't exists!");
        }
      }
    }),
];
