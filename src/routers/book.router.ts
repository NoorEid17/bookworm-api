import { Router } from "express";
import * as BookValidator from "../middlewares/book.validation";
import checkValidationResult from "../middlewares/checkValidtion";
import * as BookController from "../controllers/book.controller";
import upload from "../config/multer";
import checkAuth from "../middlewares/checkAuth";

const router = Router();

router.post(
  "/create",
  checkAuth,
  upload.single("cover"),
  BookValidator.validateCreate,
  checkValidationResult,
  BookController.createBook
);

router.get("/", BookController.getBooks);

router.get("/search", BookValidator.validateSearch, BookController.searchBooks);

router.get(
  "/category",
  BookValidator.validateGetBooksByCategory,
  BookController.getCategoryBooks
);

export default router;
