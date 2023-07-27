import { Router } from "express";
import userRouter from "./user.router";
import categoryRouter from "./category.router";
import bookRouter from "./book.router";

const router = Router();

router.use("/user", userRouter);
router.use("/category", categoryRouter);
router.use("/book", bookRouter);

export default router;
