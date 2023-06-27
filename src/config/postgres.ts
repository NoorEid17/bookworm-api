import "dotenv/config";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: "bookworm",
  dialect: "postgres",
  logging: false,
});

const configureDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({
      force: process.env.NODE_ENV == "dev" ? true : false,
    });
    console.log("DB Connected successfuly! ✔");
  } catch (error) {
    console.log(error);
  }
};

export default configureDB;
