import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Controller, ControllerAction } from "./Controller";

export class StatusGetDbConnections implements Controller {
  constructor() {
    this.action = this.action.bind(this);
  }

  private async action(_req: Request, res: Response): Promise<void> {
    res.status(StatusCodes.OK).json({
      success: true,
    });
  }

  public getController(): ControllerAction {
    return this.action;
  }
}
