import { Request, Response, NextFunction } from "express";
import Review from "../models/Review.model";
import User from "../models/User.model";

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

type query = { page: number };

export const getReviews = async (
  req: Request<{}, {}, {}, query>,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = Number(req.query.page || 1);
    const { rows: reviews, count: totalReviews } = await Review.findAndCountAll(
      {
        offset: (page - 1) * 5,
        limit: 5,
        include: User,
      }
    );
    const totalPages = Math.ceil(totalReviews / 5);
    const nextPage = page + 1 > totalPages ? undefined : page + 1;
    res.json({ reviews, nextPage });
  } catch (err) {
    next(err);
  }
};
