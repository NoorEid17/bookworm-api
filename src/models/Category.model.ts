import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/postgres";
import Book from "./Book.model";
import User from "./User.model";

class Category extends Model {
  declare categoryId: number;
  declare name: string;
  declare slug: string;
  declare creator: number | User;
}

Category.init(
  {
    categoryId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
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
      beforeValidate(category, options) {
        category.slug = category.name.trim().toLowerCase().split(" ").join("_");
      },
    },
    sequelize,
    modelName: "Category",
  }
);

Category.belongsTo(User, { foreignKey: "creator" });
Category.belongsToMany(Book, { through: "BooksCategories" });
Book.belongsToMany(Category, { through: "BooksCategories" });

export default Category;
