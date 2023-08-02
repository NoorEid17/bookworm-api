import { Model, DataTypes, HasManyAddAssociationsMixin } from "sequelize";
import { sequelize } from "../config/postgres";
import Category from "./Category.model";
import User from "./User.model";

class Book extends Model {
  declare bookId: number;
  declare title: string;
  declare slug: string;
  declare description: string;
  declare cover: string;
  declare reviewsCount: number;
  declare averageRating: number;

  declare addCategories: HasManyAddAssociationsMixin<Category, number>;
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
      unique: true,
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
    description: DataTypes.TEXT,
    creator: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "userId",
      },
    },
  },
  {
    hooks: {
      beforeValidate(book, options) {
        book.slug = book.title.trim().toLowerCase().split(" ").join("_");
      },
    },
    sequelize,
    modelName: "Book",
  }
);

Book.belongsTo(User, { foreignKey: "creator" });

export default Book;
