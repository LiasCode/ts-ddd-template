import { StatusCodes } from "http-status-codes";
import { Controller, ControllerAction } from "../Controller";
import { Request, Response } from "express";
import { redisGet, redisSet } from "../../services/redis";
import { UserFinder } from "../../../../../Contexts/BackOffice/User/application/UserFinder";
import { UserMySqlRepository } from "../../../../../Contexts/BackOffice/User/infrastructure/UserRepository";

export class UserGetAll implements Controller {
  constructor() {
    this.action = this.action.bind(this);
  }

  private async action(_req: Request, res: Response): Promise<void> {
    const redisUserGetAllKey = "users-get-all";

    const usersCached = await redisGet<string[]>(redisUserGetAllKey);

    if (usersCached && usersCached.length > 0) {
      res.status(StatusCodes.OK).json({
        success: true,
        data: usersCached,
        size: usersCached.length,
      });
      return;
    }

    const usersResponse = await new UserFinder(new UserMySqlRepository()).run();

    if (!usersResponse) {
      res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: "Can't get all users" });
      return;
    }

    try {
      if (usersResponse.length > 0) {
        const USER_CACHING_TIME = 60 * 60 * 24 * 7;
        await redisSet(redisUserGetAllKey, usersResponse, USER_CACHING_TIME);
      }
    } catch (error) {
      console.error({ error });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      data: usersResponse,
      size: usersResponse?.length,
    });
  }

  public getController(): ControllerAction {
    return this.action;
  }
}
