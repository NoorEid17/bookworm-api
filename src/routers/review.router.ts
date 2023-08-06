import { Router } from "express";
import * as ReviewController from "../controllers/review.controller";
import checkAuth from "../middlewares/checkAuth";
import checkValidationResult from "../middlewares/checkValidtion";
import {
  validateAddRating,
  validateGetReviews,
} from "../middlewares/review.validation";

const router = Router();

router.post(
  "/add",
  checkAuth,
  validateAddRating,
  checkValidationResult,
  ReviewController.addRating
);

router.get("/:bookId", validateGetReviews, ReviewController.getReviews);

router.get(
  "/single/:bookId/:userId",
  validateGetReviews,
  ReviewController.getSingleReview
);

export default router;
