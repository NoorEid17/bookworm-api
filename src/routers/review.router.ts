import { Router } from "express";
import * as ReviewController from "../controllers/review.controller";
import checkAuth from "../middlewares/checkAuth";
import checkValidationResult from "../middlewares/checkValidtion";
import { validateAddRating } from "../middlewares/review.validation";

const router = Router();

router.post(
  "/add",
  checkAuth,
  validateAddRating,
  checkValidationResult,
  ReviewController.addRating
);

export default router;
