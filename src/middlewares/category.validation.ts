import { body, param } from "express-validator";
import Category from "../models/Category.model";

const categoryExists = async (id: number): Promise<boolean> => {
  const category = await Category.findByPk(id);
  return category ? true : false;
};

export const validateCreateCategory = [
  body("name")
    .notEmpty()
    .isLength({ min: 3, max: 30 })
    .custom(async (value: string) => {
      const slug = value.trim().toLowerCase().split(" ").join("_");
      const category = await Category.findOne({ where: { slug } });
      if (category) {
        return Promise.reject("Category name is already used!");
      }
    }),
];

export const validateDeleteCategory = [
  param("categoryId")
    .notEmpty()
    .isInt()
    .custom(async (value) => {
      if (!(await categoryExists(value))) {
        return Promise.reject("Category doesn't exists");
      }
    }),
];
