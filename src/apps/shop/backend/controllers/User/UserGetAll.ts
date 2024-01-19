import { StatusCodes } from "http-status-codes";
import { Controller, ControllerAction } from "../Controller";
import { Request, Response } from "express";
import { UserFinder } from "../../../../../Contexts/Shop/User/application/UserFinder";
import { UserRepository } from "../../../../../Contexts/Shop/User/domain/UserRepository";

export class UserGetAll implements Controller {
  constructor(private readonly userRepository: UserRepository) {
    this.action = this.action.bind(this);
  }

  private async action(_: Request, res: Response): Promise<void> {
    const users = await new UserFinder(this.userRepository).run();

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
