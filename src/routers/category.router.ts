import { Router } from "express";
import * as CategoryValidation from "../middlewares/category.validation";
import * as CategoryController from "../controllers/category.controller";
import checkValidationResult from "../middlewares/checkValidtion";
import checkAuth from "../middlewares/checkAuth";

const router = Router();

router.post(
  "/create",
  checkAuth,
  CategoryValidation.validateCreateCategory,
  checkValidationResult,
  CategoryController.createCategory
);

export default router;
