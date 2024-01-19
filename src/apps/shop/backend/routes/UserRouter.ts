import Router from "express-promise-router";
import { UserGetAll } from "../controllers/User/UserGetAll";
import { UserPostCreate } from "../controllers/User/UserPostCreate";
import { UserPostLogger } from "../controllers/User/UserPostLogger";
import { UserAuthController } from "../controllers/User/UserAuthController";

export const UserRouter = Router();

UserRouter.get("/user", new UserAuthController().getController(), new UserGetAll().getController());

UserRouter.post("/user", new UserPostCreate().getController());

UserRouter.post("/user/login", new UserPostLogger().getController());
