import { Router } from "express";
import userRouter from "./user.router";
import categoryRouter from "./category.router";

const router = Router();

router.use("/user", userRouter);
router.use("/category", categoryRouter);

export default router;
