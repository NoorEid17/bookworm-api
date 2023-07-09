import { body } from "express-validator";
import User from "../models/User.model";

const checkIfUsernameUsed = async (value: any) => {
  const user = await User.findOne({ where: { username: value } });
  if (user) {
    return Promise.reject("Username is already used!");
  }
};

export const validateUserSignup = [
  body("username")
    .isLength({ min: 5, max: 30 })
    .notEmpty()
    .custom(checkIfUsernameUsed),
  body("firstName").notEmpty().isLength({ min: 3, max: 15 }),
  body("password").notEmpty().isLength({ min: 5, max: 30 }),
  body("lastName").optional().isLength({ min: 3, max: 15 }),
];

export const validateUserLogin = [
  body("username").isLength({ min: 5, max: 30 }).notEmpty(),
  body("password").notEmpty().isLength({ min: 5, max: 30 }),
];

export const validateUserUpdate = [
  body("username")
    .optional()
    .isLength({ min: 5, max: 30 })
    .custom(checkIfUsernameUsed),
  body("firstName").optional().isLength({ min: 3, max: 15 }),
  body("password").optional().isLength({ min: 5, max: 30 }),
  body("lastName").optional().isLength({ min: 3, max: 15 }),
  body("bio").optional().isLength({ min: 0, max: 200 }),
];
