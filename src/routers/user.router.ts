import { Router } from "express";
import * as UserValidation from "../middlewares/user.validation";
import * as UserController from "../controllers/user.controller";
import checkValidationResult from "../middlewares/checkValidtion";

const router = Router();

router.get("/", async (req, res) => {
  // Get All users
});

router.post(
  "/",
  UserValidation.validateUserSignup,
  checkValidationResult,
  UserController.signup
);

export default router;
