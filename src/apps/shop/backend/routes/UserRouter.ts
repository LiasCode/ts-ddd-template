import Router from "express-promise-router";
import { UserGetAll } from "../controllers/User/UserGetAll";
import { UserPostCreate } from "../controllers/User/UserPostCreate";
import { UserPostLogger } from "../controllers/User/UserPostLogger";
import { UserAuthController } from "../controllers/User/UserAuthController";
import { UserPostgresRepository } from "../../../../Contexts/Shop/User/infrastructure/UserPostgresRepository";
import { UserRepository } from "../../../../Contexts/Shop/User/domain/UserRepository";

const userRepositoryInstance: UserRepository = new UserPostgresRepository();
UserPostgresRepository.createTable();

export const UserRouter = Router();

UserRouter.get(
  "/user",
  new UserAuthController(userRepositoryInstance).getController(),
  new UserGetAll(userRepositoryInstance).getController()
);

UserRouter.post("/user", new UserPostCreate(userRepositoryInstance).getController());

UserRouter.post("/user/login", new UserPostLogger(userRepositoryInstance).getController());
