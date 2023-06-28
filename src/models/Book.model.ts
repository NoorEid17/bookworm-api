import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/postgres";
import Category from "./Category.model";

class Book extends Model {
  declare bookId: number;
  declare title: string;
  declare slug: string;
  declare description: string;
  declare cover: string;
  declare reviewsCount: number;
  declare averageRating: number;
  declare categoryId: number;
}

Book.init(
  {
    bookId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reviewsCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    averageRating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    cover: DataTypes.STRING,
    description: DataTypes.STRING,
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: Category,
        key: "categoryId",
      },
    },
  },
  { sequelize, modelName: "Book" }
);

export default Book;
