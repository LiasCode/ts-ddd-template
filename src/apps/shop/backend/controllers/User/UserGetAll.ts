import { StatusCodes } from "http-status-codes";
import { Controller, ControllerAction } from "../Controller";
import { Request, Response } from "express";
import { UserFinder } from "../../../../../Contexts/Shop/User/application/UserFinder";
import { UserInMemoryRepository } from "../../../../../Contexts/Shop/User/infrastructure/UserInMemoryRepository";

export class UserGetAll implements Controller {
  constructor() {
    this.action = this.action.bind(this);
  }

  private async action(_: Request, res: Response): Promise<void> {
    const users = await new UserFinder(new UserInMemoryRepository()).run();

    if (!users) {
      res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: "Can't get all users" });
      return;
    }

    res.status(StatusCodes.OK).json({
      success: true,
      data: users.map((user) => user.toPrimitivesSafeData()),
      size: users?.length,
    });
  }

  public getController(): ControllerAction {
    return this.action;
  }
}
