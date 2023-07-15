import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/postgres";

class User extends Model {
  declare userId: number;
  declare username: string;
  declare firstName: string;
  declare lastName: string;
  declare avatar: string;
  declare password: string;
  declare bio: string;
  declare createdAt: Date;
}

User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    bio: DataTypes.STRING,
    avatar: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName || ""}`;
      },
      set(value) {
        throw new Error("Do not try to set the `fullName` value!");
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Date.now(),
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

export default User;
