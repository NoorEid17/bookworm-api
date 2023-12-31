import { Router } from "express";
import * as UserValidation from "../middlewares/user.validation";
import * as UserController from "../controllers/user.controller";
import checkValidationResult from "../middlewares/checkValidtion";
import checkAuth from "../middlewares/checkAuth";
import upload from "../config/multer";

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

router.post("/logout", UserController.logout);

router.patch(
  "/update",
  checkAuth,
  UserValidation.validateUserUpdate,
  checkValidationResult,
  upload.single("avatar"),
  UserController.update
);

router.get("/token", UserController.refreshToken);

export default router;
