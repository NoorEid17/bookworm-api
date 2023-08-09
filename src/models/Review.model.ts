import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/postgres";
import Book from "./Book.model";
import User from "./User.model";

class Review extends Model {
  declare reviewId: number;
  declare rating: number;
  declare userId: number;
  declare bookId: number;
  declare reviewContent: string;
  declare totalRatingsValue: number;
}

Review.init(
  {
    reviewId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reviewContent: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "",
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "userId",
      },
    },
    bookId: {
      type: DataTypes.INTEGER,
      references: {
        model: Book,
        key: "bookId",
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (review, options) => {
        const book = await Book.findByPk(review.bookId);
        await book?.incrementReviewsCount();
        await book?.addRatingValue(review.rating);
        await book?.reCalculateAvgRating();
      },
      beforeDestroy: async (review, options) => {
        const book = await Book.findByPk(review.bookId);
        await book?.decrementReviewsCount();
        await book?.decreaseRatingValue(review.rating);
        await book?.reCalculateAvgRating();
      },
    },
    sequelize,
    modelName: "Review",
  }
);

Review.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Review, { foreignKey: "userId" });

Review.belongsTo(Book, { foreignKey: "bookId" });
Book.hasMany(Review, { foreignKey: "bookId" });

export default Review;
