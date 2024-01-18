import Router from "express-promise-router";
import { UserGetAll } from "../controllers/User/UserGetAll";
import { UserPostCreate } from "../controllers/User/UserPostCreate";

export const UserRouter = Router();

UserRouter.get("/user", new UserGetAll().getController());

UserRouter.post("/user", new UserPostCreate().getController());
