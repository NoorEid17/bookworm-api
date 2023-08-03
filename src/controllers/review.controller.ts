import { Request, Response, NextFunction } from "express";
import Review from "../models/Review.model";

const didUserAlreadyReviewed = async (
  userId: number,
  bookId: number
): Promise<boolean> => {
  const review = await Review.findOne({ where: { userId, bookId } });
  if (review) {
    return true;
  } else {
    return false;
  }
};

export const addRating = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.userId;

    if (await didUserAlreadyReviewed(userId, req.body.bookId)) {
      return res.status(400).json({ msg: "User already rated this book!" });
    }

    const review = await Review.create({ ...req.body, userId });
    res.status(201).json({ review });
  } catch (err) {
    next(err);
  }
};
