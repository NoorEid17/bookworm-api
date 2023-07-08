import { Router } from "express";
import * as UserValidation from "../middlewares/user.validation";
import * as UserController from "../controllers/user.controller";
import checkValidationResult from "../middlewares/checkValidtion";
import checkAuth from "../middlewares/checkAuth";

const router = Router();

router.post(
  "/signup",
  UserValidation.validateUserSignup,
  checkValidationResult,
  UserController.signup
);

router.post(
  "/login",
  UserValidation.validateUserLogin,
  checkValidationResult,
  UserController.login
);

router.get("/test", checkAuth, UserController.getProtectedResource);

export default router;
