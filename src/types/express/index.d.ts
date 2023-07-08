import User from "../../models/User.model";

declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
}
