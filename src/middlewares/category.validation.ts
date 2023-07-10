import { body } from "express-validator";
import Category from "../models/Category.model";

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
