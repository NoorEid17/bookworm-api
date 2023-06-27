import express, { Application } from "express";
import cors from "cors";
import logger from "morgan";
import configureDB from "./src/config/postgres";

configureDB();

const app: Application = express();

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(logger("dev"));

app.listen(process.env.PORT, () => {
  console.log("App is listening on http://localhost:" + process.env.PORT);
});
