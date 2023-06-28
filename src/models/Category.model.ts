import { Model, DataType, DataTypes } from "sequelize";
import { sequelize } from "../config/postgres";

class Category extends Model {
  declare categoryId: number;
  declare name: string;
}

Category.init(
  {
    categoryId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Category",
  }
);

export default Category;
